/* tslint:disable */
/* eslint-disable */
/**
* This is the main function, which reads data from two JSON files, calculates absolute and
* relative differences between the two sets of data, and writes the results to an output file.
*
* # Arguments
*
* * `fname1` - Path to local JSON file with data which are to be mutated.
* * `fname2` - Path to local JSON file with data of mutation target towards which first data are
* to be mutated.
* * `varname` - Name of variable in both `fname1` and `fname2` to be mutated.
* * `varextra` - Extra variables to be considered in the mutation.
* * `nentries` - The number of entries to be read from the JSON files.
*
* # Process
*
* 1. Reads the variable specified by `varname` from the files `fname1` and `fname2`.
* 2. Calculates the absolute and relative differences between the two sets of data.
* 3. Orders the relative differences in descending order.
*
* The following seven vectors of equal length are written to the output file:
* 1. values: The original values of 'varname' from 'fname1'.
* 2. dists: The relative degree by which each should be mutated.
*
* # Panics
*
* This function will panic if the input files cannot be read, or if the output file cannot be written.
* @param {number} nentries
* @returns {number}
*/
export function testtest1(nentries: number): number;
/**
* @param {string} json_data1
* @param {string} json_data2
* @param {string} varname
* @param {number} nentries
* @returns {string}
*/
export function uamutate(json_data1: string, json_data2: string, varname: string, nentries: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly testtest1: (a: number) => number;
  readonly uamutate: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
