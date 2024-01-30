use nalgebra::{DMatrix, DVector};
use std::collections::HashMap;

/// Transform input values according to specified schema for each input variable.
///
/// # Arguments
///
/// * `values` - An Array2 object the first column of which is to be transformed.
/// * `varname` - Name of the variable represented by the first column of `values`.
///
/// # Panics
///
/// This function will panic if `values1` is empty or if `values1` and `values2` have different
/// dimensions.
///
/// # Returns
///
/// A transformed version of `values`, with the first column being transformed according to the
/// tables specified here.
///
/// # Examples
///
/// use nalgebra::DMatrix;
///
/// let values = DMatrix::from_vec(2, 2, vec![1.0, 2.0, 3.0, 4.0]);
/// let varname = "bike_index".to_string();
/// let result = transform_values(&values, &varname);
/// assert_eq!(result[(0, 0)], 0.9);
/// assert_eq!(result[(1, 0)], 0.8);
/// assert_eq!(result[(0, 1)], 0.3);
/// assert_eq!(result[(1, 1)], 0.4);
pub fn transform_values(values: &DMatrix<f64>, varname: &str) -> DMatrix<f64> {
    assert!(!values.is_empty(), "values must not be empty");

    let mut values_ref_var: Vec<f64> = values.column(0).iter().cloned().collect();

    let mut lookup_table: HashMap<&str, f64> = HashMap::new();
    lookup_table.insert("bike_index", 1.0);
    lookup_table.insert("nature_index", 1.0);

    if let Some(&value) = lookup_table.get(varname) {
        for val in &mut values_ref_var {
            *val = value - *val;
        }
    }

    let mut result = values.clone();
    let new_col = DVector::from_vec(values_ref_var);
    result.set_column(0, &new_col);
    result
}

#[cfg(test)]
mod tests {
    use super::*;
    use nalgebra::DMatrix;

    #[test]
    fn test_transform_values() {
        let values = DMatrix::from_vec(2, 2, vec![0.1, 0.2, 0.3, 0.4]);
        let varname = "bike_index".to_string();

        let result = transform_values(&values, &varname);

        assert_eq!(result[(0, 0)], 0.9);
        assert_eq!(result[(1, 0)], 0.8);
        assert_eq!(result[(0, 1)], 0.3);
        assert_eq!(result[(1, 1)], 0.4);
    }
}
