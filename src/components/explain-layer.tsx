
interface LayerTextProps {
    [key: string]: string[]
}


export function GetLayerText(layer: string, layer2: string, numLayers: string, meanVarIndex: number, paired_keys: string[]): string {

    const lyr1 = layer.replace("\_", "").replace("index", "");
    const lyr2 = layer2.replace("\_", "").replace("index", "");

    const these_layers = paired_keys.includes(lyr1 + "_" + lyr2) ?
        lyr1 + "_" + lyr2 : lyr2 + "_" + lyr1;
    const this_layer = numLayers == "Single" ? lyr1 : these_layers;

    const LAYER_TEXT: LayerTextProps = {

        "social": ["Representative socio-demographic data such as unemployment rates, deprivation indices, inequality indices, or other indices of social disadvantage."],

        "timesabs": [
            "The average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
            "Variation in the average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are on a scale of minutes. Lower values represent less variation in travel times across the city."
            ],

        "timesrel": [
            "The ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: Lower values mean that faster public transport is faster relation to equivalent automobile times, meaning people will be more likely to use it.",
            "Variation in the ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Lower values imply lower variation across a city in the ratios of multi-modal versus private automobile travel times."
        ],
        "transfers": [
            "Number of Transfers per 10km of travel."
        ],
        "intervals": [
            "Interval between public transport services (in minutes)."
        ],
        "transport": [
            "Combined measure of tranpsport time times number of transfers times intervals between services."
        ],
        "popdens": [
            "Population density"
        ],
        "schooldist": [
            "Distance to nearest school (in kilometres)"
        ],
        "bike": [
            "Bicycle Index"
        ],
        "natural": [
            "Nature Index"
        ],
        "parking": [
            "Parking index"
        ],

        "social_timesabs": [
            "Social index (rescaled to average of one) times absolute travel times"
        ],
        "timesrel_transfers": [
            "Relative travel times multiplied by numbers of transfers."
        ],
        "timesrel_intervals": [
            "Relative travel times multiplied by intervals between consecutive services."
        ],
        "timesrel_transport": [
            "Relative travel times multiplied by compound transport index. These values will generally not mean anything."
        ],
        "timesrel_popdens": [
            "Relative travel times multiplied by population densities.."
        ],
        "timesrel_schooldist": [
            "Relative travel times multiplied by distances to nearest schools."
        ],
        "timesrel_bike": [
            "Relative travel times multiplied by bicycle index."
        ],
        "timesrel_natural": [
            "Relative travel times multiplied by index of accessibility to natural spaces."
        ],
        "timesrel_parking": [
            "Relative travel times multiplied by parking index."
        ],
        "timesrel_social": [
            "Relative travel times multiplied by social index (rescaled to average of one)."
        ],
        "timesabs_transfers": [
            "Absoulte travel times multiplied by numbers of transfers."
        ],
        "timesabs_intervals": [
            "Absoulte travel times multiplied by intervals between consecutive services."
        ],
        "timesabs_transport": [
            "Absoulte travel times multiplied by compound transport index. These values will generally not mean anything."
        ],
        "timesabs_popdens": [
            "Absoulte travel times multiplied by population densities.."
        ],
        "timesabs_schooldist": [
            "Absoulte travel times multiplied by distances to nearest schools."
        ],
        "timesabs_bike": [
            "Absoulte travel times multiplied by bicycle index."
        ],
        "timesabs_natural": [
            "Absoulte travel times multiplied by index of accessibility to natural spaces."
        ],
        "timesabs_parking": [
            "Absoulte travel times multiplied by parking index."
        ],
        "timesabs_social": [
            "Absoulte travel times multiplied by social index (rescaled to average of one)."
        ],
        "transfers_intervals": [
            "Numbers of transfers multiplied by intervals between consecutive services."
        ],
        "transfers_transport": [
            "Numbers of transfers multiplied by compound transport index. These values will generally not mean anything."
        ],
        "transfers_popdens": [
            "Numbers of transfers multiplied by population densities.."
        ],
        "transfers_schooldist": [
            "Numbers of transfers multiplied by distances to nearest schools."
        ],
        "transfers_bike": [
            "Numbers of transfers multiplied by bicycle index."
        ],
        "transfers_natural": [
            "Numbers of transfers multiplied by index of accessibility to natural spaces."
        ],
        "transfers_parking": [
            "Numbers of transfers multiplied by parking index."
        ],
        "transfers_social": [
            "Numbers of transfers multiplied by social index (rescaled to average of one)."
        ],
        "intervals_transport": [
            "Transport intervals multiplied by compound transport index. These values will generally not mean anything."
        ],
        "intervals_popdens": [
            "Transport intervals multiplied by population densities.."
        ],
        "intervals_schooldist": [
            "Transport intervals multiplied by distances to nearest schools."
        ],
        "intervals_bike": [
            "Transport intervals multiplied by bicycle index."
        ],
        "intervals_natural": [
            "Transport intervals multiplied by index of accessibility to natural spaces."
        ],
        "intervals_parking": [
            "Transport intervals multiplied by parking index."
        ],
        "intervals_social": [
            "Transport intervals multiplied by social index (rescaled to average of one)."
        ],
        "transport_popdens": [
            "Compound transport index multiplied by population densities.."
        ],
        "transport_schooldist": [
            "Compound transport index multiplied by distances to nearest schools."
        ],
        "transport_bike": [
            "Compound transport index multiplied by bicycle index."
        ],
        "transport_natural": [
            "Compound transport index multiplied by index of accessibility to natural spaces."
        ],
        "transport_parking": [
            "Compound transport index multiplied by parking index."
        ],
        "transport_social": [
            "Compound transport index multiplied by social index (rescaled to average of one)."
        ],
        "popdens_schooldist": [
            "Population density multiplied by distances to nearest schools."
        ],
        "popdens_bike": [
            "Population density multiplied by bicycle index."
        ],
        "popdens_natural": [
            "Population density multiplied by index of accessibility to natural spaces."
        ],
        "popdens_parking": [
            "Population density multiplied by parking index."
        ],
        "popdens_social": [
            "Population density multiplied by social index (rescaled to average of one)."
        ],
        "schooldist_bike": [
            "Distance to nearest school multiplied by bicycle index."
        ],
        "schooldist_natural": [
            "Distance to nearest school multiplied by index of accessibility to natural spaces."
        ],
        "schooldist_parking": [
            "Distance to nearest school multiplied by parking index."
        ],
        "schooldist_social": [
            "Distance to nearest school multiplied by social index (rescaled to average of one)."
        ],
        "bike_natural": [
            "Bicycle infrastructure index multiplied by index of accessibility to natural spaces."
        ],
        "bike_parking": [
            "Bicycle infrastructure index multiplied by parking index."
        ],
        "bike_social": [
            "Bicycle infrastructure index multiplied by social index (rescaled to average of one)."
        ],
        "natural_parking": [
            "Index of access to natural spaces multiplied by parking index."
        ],
        "natural_social": [
            "Index of access to natural spaces multiplied by social index (rescaled to average of one)."
        ],
        "parking_social": [
            "Parking index multiplied by social index (rescaled to average of one)."
        ]
    };

    var layer_text: string = "";
    if (Object.keys(LAYER_TEXT).includes(this_layer)) {
        layer_text = meanVarIndex ? LAYER_TEXT[this_layer][meanVarIndex] : LAYER_TEXT[this_layer][0];
    }

    return layer_text;
}
