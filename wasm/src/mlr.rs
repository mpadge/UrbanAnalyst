use nalgebra::{DMatrix, DVector, SVD};

use crate::utils;

/// Calculates beta coefficients (slopes) of a multiple linear regression of dimensions [1.., _] of
/// input array against first dimension [0, _].
///
/// # Arguments
///
/// * `data` - An nalgebra::DMatrix object of [observations, variables].
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
/// use nalgebra::DMatrix;
/// use uamutations::mlr::mlr_beta;
/// // Example with 2 variables
/// let data_2 = vec![
///     1.0, 2.0, 3.0, 4.0, 5.0,
///     2.1, 3.2, 4.1, 5.2, 5.9
/// ];
/// let data_2 = DMatrix::from_vec(5, 2, data_2);
/// let result_2 = mlr_beta(&data_2);
/// println!("Result with 2 variables: {:?}", result_2);
///
/// // Example with 3 variables
/// let data_3 = vec![
///     1.0, 2.0, 3.0, 4.0, 5.0,
///     2.1, 3.2, 4.1, 5.2, 5.9,
///     3.0, 4.1, 4.9, 6.0, 7.1,
/// ];
/// let data_3 = DMatrix::from_vec(5, 3, data_3);
/// let result_3 = mlr_beta(&data_3);
/// println!("Result with 3 variables: {:?}", result_3);
/// ```
pub fn mlr_beta(data: &DMatrix<f64>) -> Vec<f64> {
    assert!(!data.is_empty(), "values1 must not be empty");
    assert!(
        data.nrows() > 0 && data.ncols() > 0,
        "Data must have at least one row and one column"
    );

    let mut data_clone = data.clone();
    // Take first col as target_var:
    let target_var = data_clone.column(0).clone_owned();
    // Replacing with 1.0 for SVD:
    data_clone.set_column(0, &DVector::from_element(data_clone.nrows(), 1.0));

    // Perform SVD and solve for least squares
    let svd = SVD::new(data_clone, true, true);
    let b = svd.solve(&target_var, 0.0).unwrap();

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
pub fn adj_for_beta(values1: &mut DMatrix<f64>, values2: &DMatrix<f64>) {
    let (mean1, sd1) = utils::mean_sd_dmat(values1);

    // Calculate MLR regression coefficients between first variables and all others:
    let mut beta1 = mlr_beta(values1);
    beta1[0] = 0.0;
    let mut beta2 = mlr_beta(values2);
    beta2[0] = 0.0;

    let b1 = DMatrix::from_fn(values1.nrows(), values1.ncols(), |_, r| beta1[r]);
    let b2 = DMatrix::from_fn(values1.nrows(), values1.ncols(), |_, r| beta2[r]);

    let product1 = values1.component_mul(&b1);
    let product2 = values2.component_mul(&b2);

    let sum1: DVector<f64> = product1.column_sum();
    let sum2: DVector<f64> = product2.column_sum();
    // Adjust so that mean effect of sum2 - sum1 is zero:
    let sum_sum1: f64 = sum1.iter().sum();
    let mean_sum1 = sum_sum1 / sum1.len() as f64;
    let sum_sum2: f64 = sum2.iter().sum();
    let mean_sum2 = sum_sum2 / sum2.len() as f64;
    let adjusted_sum2: DVector<f64> = sum2.map(|x| x + mean_sum1 - mean_sum2);
    let first_column = values1.column(0).clone_owned() + adjusted_sum2 - sum1.clone();

    // Then finally adjust values to have same (mean, sd) as original values:
    let (mean2, sd2) = utils::mean_sd_column(&first_column);
    let first_column = first_column.map(|x| ((x - mean2) / sd2) * sd1 + mean1);

    values1.set_column(0, &first_column);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mlr_beta_2_variables() {
        // The rows and columns are:
        // data_2 = vec![
        //      1.0, 2.0, 3.0, 4.0, 5.0,
        //      2.1, 3.2, 4.1, 5.2, 5.9
        //  ];
        let data_2 = vec![1.0, 2.0, 3.0, 4.0, 5.0, 2.1, 3.2, 4.1, 5.2, 5.9];
        let data_2 = DMatrix::from_vec(5, 2, data_2);
        assert!(data_2[(0, 0)] == 1.0 && data_2[(1, 0)] == 2.0 && data_2[(2, 0)] == 3.0);
        assert!(data_2[(0, 1)] == 2.1 && data_2[(1, 1)] == 3.2 && data_2[(2, 1)] == 4.1);
        assert_eq!(data_2.nrows(), 5);
        assert_eq!(data_2.ncols(), 2);
        let result_2 = mlr_beta(&data_2);
        assert_eq!(result_2.len(), 2);
    }

    #[test]
    fn test_mlr_beta_3_variables() {
        // The rows and columns are:
        // let data_3 = vec![
        //    1.0, 2.0, 3.0, 4.0, 5.0,
        //    2.1, 3.2, 4.1, 5.2, 5.9,
        //    3.0, 4.1, 4.9, 6.0, 7.1,
        //];
        let data_3 = vec![
            1.0, 2.0, 3.0, 4.0, 5.0, 2.1, 3.2, 4.1, 5.2, 5.9, 3.0, 4.1, 4.9, 6.0, 7.1,
        ];
        let data_3 = DMatrix::from_vec(5, 3, data_3);
        assert!(data_3[(0, 0)] == 1.0 && data_3[(1, 0)] == 2.0 && data_3[(2, 0)] == 3.0);
        assert!(data_3[(0, 1)] == 2.1 && data_3[(1, 1)] == 3.2 && data_3[(2, 1)] == 4.1);
        assert_eq!(data_3.nrows(), 5);
        assert_eq!(data_3.ncols(), 3);
        let result_3 = mlr_beta(&data_3);
        assert_eq!(result_3.len(), 3);
    }

    #[test]
    fn test_adj_for_beta() {
        let v1 = vec![1.0, 2.0, 3.0, 4.0, 5.0, 2.1, 3.2, 4.1, 5.2, 5.9];
        let mut v1 = DMatrix::from_vec(5, 2, v1);
        let v1_orig = v1.clone();
        let v2 = vec![1.0, 2.0, 3.0, 4.0, 5.0, 3.1, 4.3, 5.3, 6.5, 7.3];
        let v2 = DMatrix::from_vec(5, 2, v2);
        adj_for_beta(&mut v1, &v2);
        assert_ne!(
            v1, v1_orig,
            "v1 should be different from v1_orig after adj_for_beta"
        );
        assert_eq!(
            v1.column(1),
            v1_orig.column(1),
            "Only the first column of v1 should be different"
        );
    }

    #[test]
    #[should_panic(expected = "values1 must not be empty")]
    fn test_mlr_beta_empty_data() {
        let empty_data = DMatrix::<f64>::zeros(0, 0);
        mlr_beta(&empty_data);
    }
}
