export interface AddModuleExports {
    uamutate(
        fname1_ptr: number,
        fname1_len: number,
        fname2_ptr: number,
        fname2_len: number,
        varname_ptr: number,
        varname_len: number,
        varextra_ptr: number,
        varextra_len: number,
        nentries: number): number;
    get_result_len(): number;
}
