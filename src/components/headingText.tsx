import { CityDataProps } from "@/data/interfaces";

/**
 * The "Explain Layer" button gets the layer definitions from the CityData
 * arrays for a single, hard-coded city. To ensure that this includes the extra
 * US census variables, this needs to be a US city. This function returns the
 * index of Washingtone DC.
 */
export function getIdxWashington(props: CityDataProps[]) {
    return props.findIndex((item) => item.name === "washington");
}


export function HeadingTextOneLayer (layer: string) {

    var heading: string = "";

    if (!layer) {
        return heading;
    }

    if (layer.replace("\_", "").substring(0,6) === "social") {
        heading = "Social Index";
    } else if (layer.replace("\_", "") === "timesrel") {
        heading = "Transport Relative";
    } else if (layer.replace("\_", "") === "timesabs") {
        heading = "Transport Absolute";
    } else if (layer === "transfers") {
        heading = "Num. Transfers";
    } else if (layer === "intervals") {
        heading = "Transport Interval";
    } else if (layer === "transport") {
        heading = "Transport Combined";
    } else if (layer === "popdens") {
        heading = "Population Density";
    } else if (layer.replace("\_", "") === "schooldist") {
        heading = "School Distance";
    } else if (layer.replace("\_", "").substring(0,4) === "bike") {
        heading = "Bicycle Index";
    } else if (layer === "natural") {
        heading = "Nature Index";
    } else if (layer === "parking") {
        heading = "Parking";
    } else if (layer === "value") {
        heading = "Housing Value";
    } else if (layer === "rent") {
        heading = "Housing Rent";
    }

    return heading;
}

// This is currently only used in maps. The stats layer also uses intermediate
// values of "dual_layers" and "this_layer", so uses explicit versions of these
// lines.
export function HeadingText (layer: string, layer2: string, numLayers: string, citiesArray: CityDataProps[]) {

    const idxWashington = getIdxWashington (citiesArray);

    const paired_keys = Object.keys(citiesArray[idxWashington].dataRangesPaired);
    const layer1: string = layer.replace("\_", "").replace("index", "");
    const layer2fmt: string = layer2.replace("\_", "").replace("index", "");
    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2fmt) ?
            layer1 + "_" + layer2fmt : layer2fmt + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);
    const this_layer: string = numLayers == "Paired" && dual_layers ?
        these_layers : layer;

    const heading: string = numLayers == "Paired" && dual_layers ?
        HeadingTextOneLayer(layer1) + " & " + HeadingTextOneLayer(layer2) :
        HeadingTextOneLayer(layer1);

    return heading;
}
