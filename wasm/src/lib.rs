//! This is a stand-alone crate which implements the mutation algorithm for [Urban
//! Analyst](https://urbananalyst.city). The algorithm mutates selected properties for one city to
//! become more like those of another selected city.

use wasm_bindgen::prelude::*;

pub mod calculate_dists;
pub mod mlr;
pub mod read_write_file;

/// This is the main function, which reads data from two JSON files, calculates absolute and
/// relative differences between the two sets of data, and writes the results to an output file.
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
pub fn testtest1(
    nentries: usize,
) -> usize {
    nentries + 1234
}

#[wasm_bindgen]
pub fn testtest2(
    json_data1: &str,
    json_data2: &str,
    varname: &str,
    nentries: usize,
) -> usize {
    let varnames: Vec<&str> = varname.split(',').collect();

    // Read contents of JSON data:
    let (mut values1, groups1) = read_write_file::readfile(json_data1, &varnames, nentries);
    let (values2, _groups2) = read_write_file::readfile(json_data2, &varnames, nentries);

    values1.nrows()
}

#[wasm_bindgen]
pub fn uamutate(
    json_data1: &str,
    json_data2: &str,
    varname: &str,
    nentries: usize,
) -> String {
    let varnames: Vec<&str> = varname.split(',').collect();

    // Read contents of JSON data:
    let (mut values1, groups1) = read_write_file::readfile(json_data1, &varnames, nentries);
    let (values2, _groups2) = read_write_file::readfile(json_data2, &varnames, nentries);
    // Adjust `values1` by removing its dependence on varextra, and replacing with the dependnece
    // of values2 on same variables (but only if `varextra` are specified):
    if values1.nrows() > 1 {
        mlr::adj_for_beta(&mut values1, &values2);
    }

    // Then calculate successive differences between the two sets of values, where `false` is for
    // the `absolute` parameter, so that differences are calculated relative to values1. These are
    // then the distances by which `values1` need to be moved in the first dimension only to match
    // the closest equivalent values of `values21`.
    let dists = calculate_dists::calculate_dists(&values1, &values2, false);
    let result = aggregate_to_groups(&dists, &groups1);

    serde_json::to_string(&result).unwrap()
}

/// Aggregate distances within the groups defined in the original `groups` vector.
///
/// # Arguments
///
/// * `dists` - A vector of distances between entries in `values1` and closest values in `values2`.
/// * `groups` - A vector of same length as `dists`, with 1-based indices of group numbers. There
/// will generally be far fewer unique groups as there are entries in `dists`.
fn aggregate_to_groups(dists: &[f64], groups: &[usize]) -> Vec<f64> {
    let groups_out: Vec<_> = groups.to_vec();
    let max_group = *groups_out.iter().max().unwrap();
    let mut counts = vec![0u32; max_group + 1];
    let mut sums = vec![0f64; max_group + 1];

    for (i, &group) in groups_out.iter().enumerate() {
        counts[group] += 1;
        sums[group] += dists[i];
    }

    // Then convert sums to mean values by dividing by counts:
    for (sum, count) in sums.iter_mut().zip(&counts) {
        *sum = if *count != 0 {
            *sum / *count as f64
        } else {
            0.0
        };
    }

    // First value of `sums` is junk because `groups` are 1-based R values:
    sums.remove(0);

    sums
}

#[cfg(test)]
mod tests {
    use super::*;

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
}
