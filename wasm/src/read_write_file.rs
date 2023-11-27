use ndarray::{Array2, Axis};
use serde_json::Value;
use std::fs::File;
use std::io::BufReader;
use std::io::Write;

// Define columns to standardise on reading:
const COLS_TO_STD: [&str; 1] = ["social_index"];

/// Reads a JSON file and returns a tuple of two vectors: one for the indices and one for the
/// values.
///
/// # Arguments
///
/// * `filename` - The path to the JSON file to be read.
/// * `varnames` - The names of the variables to be read from the JSON file.
/// * `nentries` - The number of entries to be read from the JSON file.
///
/// # Panics
///
/// This function will panic if `nentries` is less than or equal to zero, or if the file cannot be
/// read.
///
/// # Returns
///
/// A tuple of two vectors:
/// * The first vector contains the indices of the sorted values.
/// * The second vector contains the sorted values.
///
/// # Example
///
/// ```
/// use uamutations::read_write_file::readfile;
/// let filename = "./test_resources/dat1.json";
/// let varnames = vec!["transport".to_string()];
/// let nentries = 10;
/// let (values, groups) = readfile(filename, &varnames, nentries);
/// ```

pub fn readfile(
    filename: &str,
    varnames: &Vec<String>,
    nentries: usize,
) -> (Array2<f64>, Vec<usize>) {
    assert!(nentries > 0, "nentries must be greater than zero");

    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    let json: Value = serde_json::from_reader(reader).unwrap();

    let mut values = Array2::<f64>::zeros((varnames.len(), nentries));
    //let mut values = vec![Vec::new(); varnames.len()];
    let mut city_group = Vec::new();
    let city_group_col = "index";

    let mut var_exists = vec![false; varnames.len()];
    let mut current_positions = vec![0; varnames.len()];

    let mut std_index: Vec<usize> = vec![];
    if let Value::Array(array) = &json {
        for item in array {
            if let Value::Object(map) = item {
                for (i, var) in varnames.iter().enumerate() {
                    if let Some(Value::Number(number)) = map.get(var.as_str()) {
                        var_exists[i] = true;
                        if current_positions[i] == 0 && COLS_TO_STD.contains(&var.as_str()) {
                            std_index.push(i);
                        }
                        if let Some(number) = number.as_f64() {
                            if current_positions[i] < nentries {
                                values[[i, current_positions[i]]] = number;
                                current_positions[i] += 1;
                            }
                        }
                    }
                }
                if let Some(Value::Number(number)) = map.get(city_group_col) {
                    if let Some(number) = number.as_f64() {
                        if city_group.len() < nentries {
                            city_group.push(number as usize);
                        }
                    }
                }
            }
        }
    }

    if !std_index.is_empty() {
        for i in &std_index {
            standardise_array(&mut values, *i);
        }
    }

    for (i, exists) in var_exists.iter().enumerate() {
        assert!(
            *exists,
            "Variable {} does not exist in the JSON file",
            varnames[i]
        );
    }
    assert!(
        city_group.len() == values.dim().1,
        "The length of city_group does not match the number of rows in values"
    );

    (values, city_group)
}

/// Standarise one column of an array to z-scores. Column in standardised in-place.
///
/// This is used for social variables, which need to be standardised in order to have comparable
/// beta coefficients for the MLR routines.
///
/// # Arguments
/// * `values` - The array to be standarised.
/// * `i` - The index of the column to be standarised.
///
/// # Returns
/// The standarised array.
pub fn standardise_array(values: &mut Array2<f64>, i: usize) {
    let sum_values: f64 = values.index_axis(Axis(0), i).sum();

    let sum_values_sq: f64 = values.index_axis(Axis(0), i).mapv(|x| x.powi(2)).sum();

    // Calculate standard deviations:
    let nobs = values.ncols() as f64;
    let mean_val: f64 = sum_values / nobs;
    let std_dev: f64 =
        ((sum_values_sq / nobs - (sum_values / nobs).powi(2)) * nobs / (nobs - 1.0)).sqrt();

    // Transform values:
    values
        .index_axis_mut(Axis(0), i)
        .mapv_inplace(|x| (x - mean_val) / std_dev);
}

/// Writes the mean mutation values to a file.
///
/// # Arguments
///
/// * `sums` - Mutation values aggregated into city polygons.
/// * `filename` - The name of the file to which the data will be written.
///
/// # Panics
///
/// This function will panic if it fails to create or write to the file.
pub fn write_file(sums: &[f64], filename: &str) {
    let mut file = File::create(filename).expect("Unable to create file");

    // Write the header line
    writeln!(file, "mutation").expect("Unable to write to file");

    for s in sums.iter() {
        writeln!(file, "{}", s).expect("Unable to write to file");
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_abs_diff_eq;
    use ndarray::arr2;

    #[test]
    fn test_readfile() {
        let filename1 = "./test_resources/dat1.json";
        let filename2 = "./test_resources/dat2.json";
        let varnames = vec!["transport".to_string(), "social_index".to_string()];

        // -------- test panic conditions --------
        // Test when nentries <= 0
        let nentries = 0;
        let result = std::panic::catch_unwind(|| {
            readfile(filename1, &varnames, nentries);
        });
        assert!(result.is_err(), "Expected an error when nentries <= 0");

        // Test error when variables do not exist in JSON file
        let result = std::panic::catch_unwind(|| {
            readfile(filename1, &vec!["nonexistent_var".to_string()], nentries);
        });
        assert!(
            result.is_err(),
            "Expected an error when varname does not exist"
        );

        // Test error when nentries == 0:
        let result = std::panic::catch_unwind(|| {
            readfile(filename1, &varnames, 0);
        });
        assert!(result.is_err(), "Expected an error when nentries <= 0");

        // -------- test normal conditions and return values --------
        let nentries = 10;

        let (values1, groups1) = readfile(filename1, &varnames, nentries);
        let (values2, groups2) = readfile(filename2, &varnames, nentries);

        assert_eq!(
            values1.ncols(),
            nentries,
            "values returned from readfile have wrong number of columns."
        );
        assert_eq!(
            groups1.len(),
            nentries,
            "The length of groups is incorrect."
        );
        assert_eq!(
            values2.ncols(),
            nentries,
            "values returned from readfile have wrong number of columns."
        );
        assert_eq!(
            groups2.len(),
            nentries,
            "The length of groups is incorrect."
        );
    }

    #[test]
    fn test_standardise_array() {
        let mut values = arr2(&[[1.0, 2.0, 3.0, 4.0, 5.0], [6.0, 7.0, 8.0, 9.0, 10.0]]);
        let i = 0;
        standardise_array(&mut values, i);
        let expected_values = arr2(&[
            [-1.2649, -0.6325, 0.0, 0.6325, 1.2649],
            [6.0, 7.0, 8.0, 9.0, 10.0],
        ]);

        for (a, b) in values.iter().zip(expected_values.iter()) {
            assert_abs_diff_eq!(a, b, epsilon = 1e-4);
        }
    }

    #[test]
    fn test_write_file() {
        use std::fs;
        use std::io::Read;

        let sums = vec![1.0, 4.5, 3.0, 2.0];
        let filename = "/tmp/test_write_file.txt";

        write_file(&sums, filename);

        let mut file = fs::File::open(filename).expect("Unable to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Unable to read file");

        let expected_contents = "\
            mutation\n\
            1\n\
            4.5\n\
            3\n\
            2\n";

        assert_eq!(contents, expected_contents);
    }
}
