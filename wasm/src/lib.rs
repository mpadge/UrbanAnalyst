//! This is a stand-alone crate which implements the mutation algorithm for [Urban
//! Analyst](https://urbananalyst.city). The algorithm mutates selected properties for one city to
//! become more like those of another selected city.

use wasm_bindgen::prelude::*;
use nalgebra::DMatrix;

pub mod calculate_dists;
pub mod mlr;
pub mod read_write_file;
pub mod transform;
pub mod utils;

/// This is the main function, which reads data from two JSON files, calculates absolute and
/// relative differences between the two sets of data, and writes the results to an output file.
///
/// Some variables have to be log-transformed prior to any analytic routines. The names of these
/// are defined in utils::log_transform.
///
/// # Arguments
///
/// * `fname1` - Path to local JSON file with data which are to be mutated.
/// * `fname2` - Path to local JSON file with data of mutation target towards which first data are
/// to be mutated.
/// * `varname` - Name of variable in both `fname1` and `fname2` to be mutated.
/// * `varextra` - Extra variables to be considered in the mutation.
/// * `nentries` - The number of entries to be read from the JSON files.
///
/// # Returns
///
/// A vector of length equal to number of distinct groups in the input data 'index' column, with
/// each value quantifying the mean distance to the nearest points in the target distribution.
///
/// # Process
///
/// 1. Reads the variable specified by `varname` from the files `fname1` and `fname2`.
/// 2. Calculates the absolute and relative differences between the two sets of data.
/// 3. Orders the relative differences in descending order.
///
/// The following seven vectors of equal length are written to the output file:
/// 1. values: The original values of 'varname' from 'fname1'.
/// 2. dists: The relative degree by which each should be mutated.
///
/// # Panics
///
/// This function will panic if the input files cannot be read, or if the output file cannot be written.

#[wasm_bindgen]
pub fn uamutate(
    json_data1: &str,
    json_data2: &str,
    varname: &str,
    nentries: usize,
) -> String {
    let varnames: Vec<&str> = varname.split(',').collect();
    let varnames_str: Vec<String> = varname.split(',').map(|s| s.to_string()).collect();

    // Read contents of JSON data:
    let (mut values1, groups1) = read_write_file::readfile(json_data1, &varnames, nentries);
    let (mut values2, _groups2) = read_write_file::readfile(json_data2, &varnames, nentries);

    let log_scale = utils::log_transform(&mut values1, &varnames_str);
    let _log_scale = utils::log_transform(&mut values2, &varnames_str);

    // Adjust `values1` by removing its dependence on varextra, and replacing with the dependnece
    // of values2 on same variables (but only if `varextra` are specified):
    if values1.nrows() > 1 {
        mlr::adj_for_beta(&mut values1, &values2);
    }

    // Transform values for variables specified in 'lookup_table' of 'transform.rs':
    transform::transform_invert_values(&mut values1, &varnames[0]);
    transform::transform_invert_values(&mut values2, &varnames[0]);

    // Then calculate successive differences between the two sets of values. These are the
    // distances by which `values1` need to be moved in the first dimension only to match the
    // closest equivalent values of `values2`.
    let dists = calculate_dists::calculate_dists(&values1, &values2, &log_scale);
    let result = aggregate_to_groups(&values1, &dists, &groups1, &log_scale);

    let result_array: Vec<Vec<f64>> = result.row_iter().map(|row| row.iter().cloned().collect()).collect();
    return serde_json::to_string(&result_array).unwrap();
}

/// Loop over all columns of the `dists` `DMatrix` object, and aggregate groups for each column.
///
/// # Arguments
///
/// * `values1` - The original values used as references for the distances; aggregated versions of
/// these are also returned.
/// * `dists` - A matrix of distances between entries in `values1` and closest values in `values2`.
/// * `groups` - A vector of same length as `dists`, with 1-based indices of group numbers. There
/// will generally be far fewer unique groups as there are entries in `dists`.
/// * `log_scale` - If true, distances are logged before being aggregated, with final values being
/// 10 ^ mean (log10 (x)).
///
/// # Returns
///
/// A `DMatrix` object with numbers of rows equal to number of distinct groups in the input data
/// 'index' column, with each value quantifying the mean distance to the nearest points in the
/// target distribution. This return object has four columns:
/// 1. The original value
/// 2. The mutated value
/// 3. The absolute difference between mutate and original values
/// 4. The relative difference between mutate and original values
fn aggregate_to_groups(
    values1: &DMatrix<f64>,
    dists: &DMatrix<f64>,
    groups: &[usize],
    log_scale: &bool,
) -> DMatrix<f64> {
    assert!(dists.ncols() == 2, "dists must have two columns");
    assert!(
        dists.nrows() == values1.nrows(),
        "dists must have same number of rows as values1"
    );
    assert!(
        groups.len() == values1.nrows(),
        "groups must have same length as values1"
    );

    // Aggregate original values first. These are already log-scaled, so set flag to `false`, and
    // transform back after aggregation:
    let mut values1_first_col: Vec<f64> = values1.column(0).iter().cloned().collect();
    let mut values1_aggregated = aggregate_to_groups_single_col(&values1_first_col, groups, &false);
    if *log_scale {
        values1_aggregated = values1_aggregated.iter().map(|&x| 10f64.powf(x)).collect();
        values1_first_col = values1_first_col.iter().map(|&x| 10f64.powf(x)).collect();
    }

    // Then generate absolute transformed value from original value plus absolute distance:
    let dists_abs: Vec<f64> = dists.column(0).iter().cloned().collect();
    let values1_transformed: Vec<f64> = values1_first_col
        .iter()
        .zip(dists_abs.iter())
        .map(|(&a, &b)| a + b)
        .collect();
    // And aggregate those into groups. The `log_scale` flag ensures that variables which should be
    // log-scaled are first aggregated in log form, then the aggregate values transformed back to
    // 10^x.
    let values1_transformed_aggregated =
        aggregate_to_groups_single_col(&values1_transformed, groups, log_scale);
    assert!(
        values1_transformed_aggregated.len() == values1_aggregated.len(),
        "values1_aggregated and values1_transformed_aggregated have different lengths"
    );

    // Even log-scaled variables at that point have been aggregated in log-space, so distributions
    // are far more normal than those of underlying values, and aggregation here is direct. Plus
    // for `dists_abs` and `dists_rel`, values can also be < 0, so log-scaling can't be used in
    // this aggregation anyway.
    let dists_abs_aggregated = aggregate_to_groups_single_col(&dists_abs, groups, &false);
    assert!(
        dists_abs_aggregated.len() == values1_aggregated.len(),
        "values1_aggregated and dists_abs_aggregated have different lengths"
    );
    let dists_rel: Vec<f64> = dists.column(1).iter().cloned().collect();
    let dists_rel_aggregated = aggregate_to_groups_single_col(&dists_rel, groups, &false);
    assert!(
        dists_rel_aggregated.len() == values1_aggregated.len(),
        "values1_aggregated and dists_rel_aggregated have different lengths"
    );

    let mut result = DMatrix::zeros(values1_aggregated.len(), 4);
    result.column_mut(0).copy_from_slice(&values1_aggregated);
    result
        .column_mut(1)
        .copy_from_slice(&values1_transformed_aggregated);
    result.column_mut(2).copy_from_slice(&dists_abs_aggregated);
    result.column_mut(3).copy_from_slice(&dists_rel_aggregated);

    result
}

/// Aggregate a single column of distances within the groups defined in the original `groups`
/// vector.
///
/// # Arguments
///
/// * `dists` - A vector of distances between entries in `values1` and closest values in `values2`.
/// * `groups` - A vector of same length as `dists`, with 1-based indices of group numbers. There
/// will generally be far fewer unique groups as there are entries in `dists`.
/// * `log_scale` - If true, distances are logged before being aggregated, with final values being
/// 10 ^ mean (log10 (x)).
///
/// # Returns
///
/// A vector of mean distances within each group to the nearest points in the target distribution.
fn aggregate_to_groups_single_col(dists: &[f64], groups: &[usize], log_scale: &bool) -> Vec<f64> {
    let groups_out: Vec<_> = groups.to_vec();
    let max_group = *groups_out.iter().max().unwrap();
    let mut counts = vec![0u32; max_group + 1];
    let mut sums = vec![0f64; max_group + 1];

    for (i, &group) in groups_out.iter().enumerate() {
        counts[group] += 1;
        sums[group] += if *log_scale {
            dists[i].log10()
        } else {
            dists[i]
        };
    }

    // Then convert sums to mean values by dividing by counts:
    for (sum, count) in sums.iter_mut().zip(&counts) {
        *sum = if *count != 0 {
            *sum / *count as f64
        } else {
            0.0
        };
        if *log_scale {
            *sum = 10.0f64.powf(*sum);
        }
    }

    // First value of `sums` is junk because `groups` are 1-based R values:
    sums.remove(0);

    sums
}

#[cfg(test)]
mod tests {
    use super::*;
    use nalgebra::DMatrix;

    #[test]
    fn test_uamutate() {
        // Define the input parameters for the function
        let filename1 = "./test_resources/dat1.json";
        let filename2 = "./test_resources/dat2.json";
        let varname = "bike_index";
        // let varextra: Vec<String> = Vec::new();
        let varextra = vec!["natural".to_string(), "social_index".to_string()];
        let nentries = 10;

        let varsall: Vec<String> = vec![varname.to_string()];
        let varsall = [varsall, varextra].concat();
        // let (mut values1, groups1) = read_write_file::readfile(filename1, &varsall, nentries);
        // let (values2, _groups2) = read_write_file::readfile(filename2, &varsall, nentries);

        // let sums = uamutate(&mut values1, groups1, &values2);
        let file1 = File::open(filename1).unwrap();
        let reader1 = BufReader::new(file1);
        let file2 = File::open(filename2).unwrap();
        let reader2 = BufReader::new(file2);
        let sums = uamutate(reader1, reader2, &varsall, nentries);

        assert!(!sums.is_empty());
    }

    #[test]
    #[should_panic(expected = "dists must have two columns")]
    fn test_aggregate_to_groups_invalid_dists_columns() {
        let values1 = DMatrix::from_vec(1, 1, vec![1.0]);
        let dists = DMatrix::from_vec(1, 1, vec![1.0]);
        let groups = vec![1];
        let log_scale = false;
        aggregate_to_groups(&values1, &dists, &groups, &log_scale);
    }

    #[test]
    #[should_panic(expected = "dists must have same number of rows as values1")]
    fn test_aggregate_to_groups_mismatched_rows() {
        let values1 = DMatrix::from_vec(1, 1, vec![1.0]);
        let dists = DMatrix::from_vec(2, 2, vec![1.0, 2.0, 3.0, 4.0]);
        let groups = vec![1, 2];
        let log_scale = false;
        aggregate_to_groups(&values1, &dists, &groups, &log_scale);
    }

    #[test]
    #[should_panic(expected = "groups must have same length as values1")]
    fn test_aggregate_to_groups_mismatched_groups_length() {
        let values1 = DMatrix::from_vec(1, 1, vec![1.0]);
        let dists = DMatrix::from_vec(1, 2, vec![1.0, 2.0]);
        let groups = vec![1, 2];
        let log_scale = false;
        aggregate_to_groups(&values1, &dists, &groups, &log_scale);
    }
}
