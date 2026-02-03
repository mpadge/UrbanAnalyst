import { DataRangeKeys, Data2RangeKeys, CityDataProps } from '@/data/interfaces';

/**
 * Utility function to calculate layer ranges and determine which layer to use
 * for both single and paired layer scenarios. Only used in /map page.
 *
 * @param idx - City index
 * @param layer - Primary layer name
 * @param layer2 - Secondary layer name (for paired layers)
 * @param numLayers - "Single" or "Paired"
 * @param citiesArray - Array of city data
 * @returns Object containing processed layer name and range information
 */
export function calculateLayerRanges(
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    citiesArray: CityDataProps[]
) {
    const layer1: string = layer.replace("\_", "").replace("index", "");
    const layer2_repl: string = layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(citiesArray[idx].dataRangesPaired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2_repl) ?
            layer1 + "_" + layer2_repl : layer2_repl + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = numLayers == "Paired" && dual_layers ?
        these_layers : layer;

    const layer_start = numLayers == "Paired" && dual_layers ?
        citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][0] :
        citiesArray[idx].dataRanges[this_layer as DataRangeKeys][0];
    const layer_min = numLayers == "Paired" && dual_layers ?
        citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][1] :
        citiesArray[idx].dataRanges[this_layer as DataRangeKeys][1];
    const layer_max = numLayers == "Paired" && dual_layers ?
        citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][2] :
        citiesArray[idx].dataRanges[this_layer as DataRangeKeys][2];
    const layer_stop = numLayers == "Paired" && dual_layers ?
        citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][3] :
        citiesArray[idx].dataRanges[this_layer as DataRangeKeys][3];

    return {
        this_layer,
        layer_start,
        layer_min,
        layer_max,
        layer_stop,
        dual_layers,
        these_layers
    };
}
