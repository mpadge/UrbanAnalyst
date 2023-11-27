use nalgebra::{DMatrix, DVector, SVD};
use ndarray::{s, Array2};

/// Calculates beta coefficients (slopes) of a multiple linear regression of dimensions [1.., _] of
/// input array against first dimension [0, _].
///
/// # Arguments
///
/// * `data` - An ndarray::Array2 object of [variables, observations].
///
/// # Panics
///
/// This function will panic if `data` is empty.
///
/// # Returns
///
/// Vector of f64 values of multiple linear regression coefficients, one for each variable.
///
/// # Example
///
/// ```
/// use ndarray::array;
/// use uamutations::mlr::mlr_beta;
/// // Example with 2 variables
/// let data_2 = array![
/// [1.0, 2.0, 3.0, 4.0, 5.0],
/// [2.1, 3.2, 4.1, 5.2, 5.9],
/// ];
/// let result_2 = mlr_beta(&data_2);
/// println!("Result with 2 variables: {:?}", result_2);
///
/// // Example with 3 variables
/// let data_3 = array![
/// [1.0, 2.0, 3.0, 4.0, 5.0],
/// [2.1, 3.2, 4.1, 5.2, 5.9],
/// [3.0, 4.1, 4.9, 6.0, 7.1],
/// ];
/// let result_3 = mlr_beta(&data_3);
/// println!("Result with 3 variables: {:?}", result_3);
/// ```
pub fn mlr_beta(data: &Array2<f64>) -> Vec<f64> {
    assert!(!data.is_empty(), "values1 must not be empty");

    // Transpose data(vars, obs) to (obs, vars):
    let mut data_clone = data.t().to_owned();
    // Take first column as target_var:
    let target_var = data_clone.column(0).to_owned();
    // Remove that column from data_clone:
    data_clone = data_clone.slice_mut(s![.., 1..]).to_owned();
    assert!(
        data_clone.nrows() > 0 && data_clone.ncols() > 0,
        "Data must have at least one row and one column"
    );

    // Convert ndarray to nalgebra::DMatrix
    let data_slice = data_clone
        .as_slice_memory_order()
        .expect("Data is not contiguous in memory");
    let data_matrix = DMatrix::from_row_slice(data_clone.nrows(), data_clone.ncols(), data_slice);
    let target_vector = DVector::from_column_slice(&target_var.to_vec());

    // Perform SVD and solve for least squares
    let svd = SVD::new(data_matrix, true, true);
    let b = svd.solve(&target_vector, 0.0).unwrap();

    b.iter().cloned().collect()
}

/// Adjusts the first row of `values1` based on the multi-linear regression coefficients of the
/// remaining rows of `values1` against `values2`.
///
/// This effectivly removes the dependence of the first row of `values1` by on all other
/// variables/rows, and replaces it with the dependence of `values2` on the same variables.
/// Importantly, this adjustment also standardises the values to a different scale.
///
/// # Arguments
///
/// * `values1` - A 2D array where the first row is the variable to be adjusted and the remaining
/// rows are the other variables.
/// * `values2` - A 2D array with the same structure as `values1`, used to calculate the MLR
/// coefficients for adjustment.
///
/// * Example
/// let mut v1 = array![[1.0, 2.0, 3.0, 4.0, 5.0], [2.1, 3.2, 4.1, 5.2, 5.9]];
/// let v1_orig = v1.clone();
/// let v2 = array![[1.0, 2.0, 3.0, 4.0, 5.0], [3.1, 4.3, 5.3, 6.5, 7.3]];
/// adj_for_beta(&mut v1, &v2);
/// assert_ne!(v1, v1_orig, "v1 should differ from v1_orig");
/// assert_eq!(
///     v1.slice(s![1.., ..]),
///     v1_orig.slice(s![1.., ..]),
///     "Only the first row of v1 should be different"
/// );
pub fn adj_for_beta(values1: &mut Array2<f64>, values2: &Array2<f64>) {
    // Calculate MLR regression coefficients between first variables and all others:
    let beta1 = mlr_beta(values1);
    let beta2 = mlr_beta(values2);
    // Then adjust `values1` by removing its dependence on those variables, and replacing with the
    // dependnece of values2 on same variables:
    let mut result = ndarray::Array1::zeros(values1.ncols());
    for i in 0..values1.ncols() {
        let b1 = ndarray::Array1::from(beta1.clone());
        let b2 = ndarray::Array1::from(beta2.clone());
        let values_slice = values1.slice(s![1.., i]).to_owned();
        let product = &values_slice * (1.0 + &b2 - &b1);
        result[i] = product.sum();
    }
    values1.row_mut(0).assign(&result);
}

#[cfg(test)]
mod tests {
    use super::*;
    use ndarray::array;

    #[test]
    fn test_mlr_beta_2_variables() {
        let data_2 = array![[1.0, 2.0, 3.0, 4.0, 5.0], [2.1, 3.2, 4.1, 5.2, 5.9],];
        let result_2 = mlr_beta(&data_2);
        assert_eq!(result_2.len(), 1);
    }

    #[test]
    fn test_mlr_beta_3_variables() {
        let data_3 = array![
            [1.0, 2.0, 3.0, 4.0, 5.0],
            [2.1, 3.2, 4.1, 5.2, 5.9],
            [3.0, 4.1, 4.9, 6.0, 7.1],
        ];
        let result_3 = mlr_beta(&data_3);
        assert_eq!(result_3.len(), 2);
    }

    #[test]
    fn test_adj_for_beta() {
        let mut v1 = array![[1.0, 2.0, 3.0, 4.0, 5.0], [2.1, 3.2, 4.1, 5.2, 5.9]];
        let v1_orig = v1.clone();
        let v2 = array![[1.0, 2.0, 3.0, 4.0, 5.0], [3.1, 4.3, 5.3, 6.5, 7.3]];
        adj_for_beta(&mut v1, &v2);
        assert_ne!(
            v1, v1_orig,
            "v1 should be different from v1_orig after adj_for_beta"
        );
        assert_eq!(
            v1.slice(s![1.., ..]),
            v1_orig.slice(s![1.., ..]),
            "Only the first row of v1 should be different"
        );
    }
}
