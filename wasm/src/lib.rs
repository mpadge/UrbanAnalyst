//! This is a stand-alone crate which implements the mutation algorithm for [Urban
//! Analyst](https://urbananalyst.city). The algorithm mutates selected properties for one city to
//! become more like those of another selected city.

pub mod calculate_dists;
pub mod mlr;
pub mod read_write_file;

static mut RESULT_LEN: usize = 0;

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

#[no_mangle]
pub extern "C" fn uamutate(
    fname1_ptr: *const u8,
    fname1_len: usize,
    fname2_ptr: *const u8,
    fname2_len: usize,
    varname_ptr: *const u8,
    varname_len: usize,
    varextra_ptr: *const u8, // comma-delimited values
    varextra_len: usize,
    nentries: usize,
) -> *const f64 {
    let fname1 = unsafe { std::str::from_utf8(std::slice::from_raw_parts(fname1_ptr, fname1_len)).unwrap() };
    let fname2 = unsafe { std::str::from_utf8(std::slice::from_raw_parts(fname2_ptr, fname2_len)).unwrap() };
    let varname = unsafe { std::str::from_utf8(std::slice::from_raw_parts(varname_ptr, varname_len)).unwrap() };
    let varextra = unsafe { std::str::from_utf8(std::slice::from_raw_parts(varextra_ptr, varextra_len)).unwrap() };
    let varextra: Vec<String> = if varextra.is_empty() {
        Vec::new()
    } else {
        varextra.split(',').map(|s| s.to_string()).collect()
    };

    let varsall: Vec<String> = vec![varname.to_string()];
    let num_varextra = varextra.len();
    let varsall = [varsall, varextra].concat();
    let (mut values1, groups1) = read_write_file::readfile(fname1, &varsall, nentries);
    let (values2, _groups2) = read_write_file::readfile(fname2, &varsall, nentries);

    // Then adjust `values1` by removing its dependence on varextra, and replacing with the
    // dependnece of values2 on same variables (but only if `varextra` are specified):
    if num_varextra > 0 {
        mlr::adj_for_beta(&mut values1, &values2);
    }

    // Then calculate successive differences between the two sets of values, where `false` is for
    // the `absolute` parameter, so that differences are calculated relative to values1. These are
    // then the distances by which `values1` need to be moved in the first dimension only to match
    // the closest equivalent values of `values21`.
    let dists = calculate_dists::calculate_dists(&values1, &values2, false);
    let result = aggregate_to_groups(&dists, &groups1);

    // Convert to FFI-stable .js form. Can be accessed in js like this:
    // const wasmModule = ... // Load your wasm module
    // const ptr = wasmModule.uamutate(...);
    // const len = wasmModule.get_result_len();
    // const result = new Float64Array(wasmModule.memory.buffer, ptr, len);
    let ptr = result.as_ptr();
    unsafe {
        RESULT_LEN = result.len();
    }
    std::mem::forget(result);
    ptr
}


#[no_mangle]
pub extern "C" fn get_result_len() -> usize {
    unsafe { RESULT_LEN }
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
        let varextra: Vec<String> = Vec::new();
        let nentries = 10;

        // Call the function with the test parameters
        let sums = uamutate(filename1, filename2, varname, varextra, nentries);

        assert!(!sums.is_empty());
    }
}
