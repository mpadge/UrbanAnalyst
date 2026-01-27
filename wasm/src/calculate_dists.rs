use nalgebra::DMatrix;

pub struct OrderingIndex {
    index_sort: Vec<usize>,
    index_reorder: Vec<usize>,
}

/// Calculates a vector of sequential difference between two arrays of f64 values.
///
/// The distances are calculated in the full multi-dimensional space, so that each value in the
/// first array (`values1`) is matched to the entry in `values2` at the minimal distance. Each
/// element of `values2` is matched to one unique element of `values1`. Unique matching is done
/// with a hash map, meaning that the procedure only works consistently if started from some
/// extreme point of the `values1` distribution. This extreme point is taken as the lowest value of
/// the first column of `values1`. Alternatives to this include calculating a multiple linear
/// regression between the first column of `values1` and all columns of `values2`, and taking the
/// first point of that, but that will by definition be the lowest (or possibly highest) value of
/// `values1` anyway.
///
/// This consideration means that `values1` can first be sorted by the first column, these sorted
/// values used to find closest values of `values2`, and then the original order restored to yield
/// the final desired matching.
///
/// # Arguments
///
/// * `values1` - An Array2 object which provides the reference values against which to sort
///   `values2`.
/// * `values2` - An Array2 object which is to be sorted against `values1`.
/// * `absolute` - A boolean indicating whether to calculate absolute differences.
///
/// # Panics
///
/// This function will panic if `values1` is empty or if `values1` and `values2` have different
/// dimensions.
///
/// # Returns
///
/// A vector of `usize` values matching each consecutive element in `values1` to the closest
/// elements in `values2`.  If `absolute` is true, the differences are absolute values. Otherwise,
/// the differences are differences relative to `values1`.
///
/// # Example
///
/// ```
/// use nalgebra::DMatrix;
/// use uamutations::calculate_dists::calculate_dists;
/// let values1 = vec![1.0, 2.0, 4.0, 5.0];
/// let values1 = DMatrix::from_vec(4, 1, values1);
/// let values2 = vec![7.0, 9.0, 3.0, 2.0];
/// let values2 = DMatrix::from_vec(4, 1, values2);
/// let log_scale = false;
/// let result = calculate_dists(&values1, &values2, &log_scale);
/// // The first column of `result` contains the minimal absolute differences. Paired sequences are
/// // (1, 2), (2, 3), (4, 7), (5, 9), with differences of (1, 1, 3, 4).
/// let res_col0 = result.column(0).iter().cloned().collect::<Vec<f64>>();
/// let res0 = vec![1.0, 1.0, 3.0, 4.0];
/// assert_eq!(res_col0, res0);
/// // The second column then holds differences relative to the initial values:
/// let res_col1 = result.column(1).iter().cloned().collect::<Vec<f64>>();
/// let res1 = vec![1.0, 0.5, 0.75, 0.8];
/// assert_eq!(res_col1, res1);
/// ```
pub fn calculate_dists(
    values1: &DMatrix<f64>,
    values2: &DMatrix<f64>,
    log_scale: &bool,
) -> DMatrix<f64> {
    assert!(!values1.is_empty(), "values1 must not be empty");
    assert_eq!(
        values1.shape(),
        values2.shape(),
        "values1 and values2 must have the same dimensions."
    );

    let values1_ref_var: Vec<f64> = values1.column(0).iter().cloned().collect();
    let values2_ref_var: Vec<f64> = values2.column(0).iter().cloned().collect();

    let sorting_order = get_ordering_index(&values1_ref_var.to_vec(), false, false);

    // Order values1_ref_var by sorting_order.index_sort:
    let mut values1_sorted: Vec<f64> = sorting_order
        .index_sort
        .iter()
        .map(|&i| values1_ref_var[i])
        .collect();
    // Sort values2_ref_var:
    let mut values2_sorted = values2_ref_var.clone();
    values2_sorted.sort_by(|a, b| a.partial_cmp(b).unwrap());

    if log_scale == &true {
        values1_sorted.iter_mut().for_each(|x| *x = 10f64.powf(*x));
        values2_sorted.iter_mut().for_each(|x| *x = 10f64.powf(*x));
    }

    // Calculate conseqcutive differences between the two vectors:
    let differences_abs: Vec<f64> = values1_sorted
        .iter()
        .zip(values2_sorted.iter())
        .map(|(&a, &b)| b - a)
        .collect();
    let eps = 1.0e-10;
    let differences_rel: Vec<f64> = values1_sorted
        .iter()
        .zip(values2_sorted.iter())
        .map(|(&a, &b)| {
            if a <= eps || b <= eps {
                0.0
            } else {
                (b - a) / a
            }
        })
        .collect();
    // And re-order those differences according to sorting_order.index_reorder, so they align with
    // the original order of `values1`:
    let differences_abs: Vec<f64> = sorting_order
        .index_reorder
        .iter()
        .map(|&i| differences_abs[i])
        .collect();
    let differences_rel: Vec<f64> = sorting_order
        .index_reorder
        .iter()
        .map(|&i| differences_rel[i])
        .collect();

    DMatrix::from_row_slice(
        2,
        differences_abs.len(),
        &[differences_abs, differences_rel].concat(),
    )
    .transpose()
}

/// Returns a vector of indices that would sort the input vector in ascending or descending order.
///
/// # Arguments
///
/// * `vals` - A slice of f64 values to be sorted.
/// * `desc` - If `true`, sort in descending order; otherwise sort in ascensing order.
/// * `is_abs` - A boolean indicating whether sorting should be based on absolute values.
///
/// # Example
///
/// ```
/// use uamutations::calculate_dists::get_ordering_index;
/// let vals = vec![1.0, -2.0, 3.0, -4.0, 5.0];
/// let result = get_ordering_index(&vals, false, false);
/// // assert_eq!(result, vec![3, 1, 0, 2, 4]);
/// ```
pub fn get_ordering_index(vals: &[f64], desc: bool, is_abs: bool) -> OrderingIndex {
    let mut pairs: Vec<_> = vals.iter().enumerate().collect();

    if is_abs {
        if desc {
            pairs.sort_by(|&(_, a), &(_, b)| b.abs().partial_cmp(&a.abs()).unwrap());
        } else {
            pairs.sort_by(|&(_, a), &(_, b)| a.abs().partial_cmp(&b.abs()).unwrap());
        }
    } else if desc {
        pairs.sort_by(|&(_, a), &(_, b)| b.partial_cmp(a).unwrap());
    } else {
        pairs.sort_by(|&(_, a), &(_, b)| a.partial_cmp(b).unwrap());
    }

    let index: Vec<_> = pairs.iter().map(|&(index, _)| index).collect();

    let mut reorder_index = vec![0; index.len()];
    for (i, &idx) in index.iter().enumerate() {
        reorder_index[idx] = i;
    }

    OrderingIndex {
        index_sort: index,
        index_reorder: reorder_index,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_ordering_index() {
        let vals = vec![1.0, -2.0, 3.0, -4.0, 5.0];
        let expected = OrderingIndex {
            index_sort: vec![3, 1, 0, 2, 4], // Indices of vals in ascending order
            // bool flags are (desc, is_abs):
            index_reorder: vec![2, 1, 3, 0, 4],
        };
        let oi = get_ordering_index(&vals, false, false);
        assert_eq!(oi.index_sort, expected.index_sort);
        assert_eq!(oi.index_reorder, expected.index_reorder);
    }

    #[test]
    fn test_get_ordering_index_abs() {
        let vals = vec![1.0, -2.0, 3.0, -4.0, 5.0];
        let expected = OrderingIndex {
            index_sort: vec![0, 1, 2, 3, 4], // Indices of vals in ascending order
            // bool flags are (desc, is_abs):
            index_reorder: vec![0, 1, 2, 3, 4],
        };
        let oi = get_ordering_index(&vals, false, true);
        assert_eq!(oi.index_sort, expected.index_sort);
        assert_eq!(oi.index_reorder, expected.index_reorder);
    }

    #[test]
    fn test_calculate_dists() {
        // Note that 2.0 is closest to 2.0, but is matched to 3.0 because of sequential and unique
        // matching.
        let values1 = vec![1.0, 2.0, 4.0, 5.0];
        let values2 = vec![7.0, 9.0, 3.0, 2.0];
        let values1 = DMatrix::from_vec(4, 1, values1);
        let values2 = DMatrix::from_vec(4, 1, values2);
        let result = calculate_dists(&values1, &values2, &false);
        assert_eq!(result.ncols(), 2, "Result should have 2 columns");
        // First col has absolute differences:
        let res_col0 = result.column(0).iter().cloned().collect::<Vec<f64>>();
        let res0 = vec![1.0, 1.0, 3.0, 4.0];
        assert_eq!(res_col0, res0);
        // Second column holds differences relative to the initial values:
        let res_col1 = result.column(1).iter().cloned().collect::<Vec<f64>>();
        let res1 = vec![1.0, 0.5, 0.75, 0.8];
        assert_eq!(res_col1, res1);
    }
}
