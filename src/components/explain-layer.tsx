
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
            "Explanatory Text"
        ],
        "timesrel_intervals": [
            "Explanatory Text"
        ],
        "timesrel_transport": [
            "Explanatory Text"
        ],
        "timesrel_popdens": [
            "Explanatory Text"
        ],
        "timesrel_schooldist": [
            "Explanatory Text"
        ],
        "timesrel_bike": [
            "Explanatory Text"
        ],
        "timesrel_natural": [
            "Explanatory Text"
        ],
        "timesrel_parking": [
            "Explanatory Text"
        ],
        "timesrel_social": [
            "Explanatory Text"
        ],
        "timesabs_transfers": [
            "Explanatory Text"
        ],
        "timesabs_intervals": [
            "Explanatory Text"
        ],
        "timesabs_transport": [
            "Explanatory Text"
        ],
        "timesabs_popdens": [
            "Explanatory Text"
        ],
        "timesabs_schooldist": [
            "Explanatory Text"
        ],
        "timesabs_bike": [
            "Explanatory Text"
        ],
        "timesabs_natural": [
            "Explanatory Text"
        ],
        "timesabs_parking": [
            "Explanatory Text"
        ],
        "timesabs_social": [
            "Explanatory Text"
        ],
        "transfers_intervals": [
            "Explanatory Text"
        ],
        "transfers_transport": [
            "Explanatory Text"
        ],
        "transfers_popdens": [
            "Explanatory Text"
        ],
        "transfers_schooldist": [
            "Explanatory Text"
        ],
        "transfers_bike": [
            "Explanatory Text"
        ],
        "transfers_natural": [
            "Explanatory Text"
        ],
        "transfers_parking": [
            "Explanatory Text"
        ],
        "transfers_social": [
            "Explanatory Text"
        ],
        "intervals_transport": [
            "Explanatory Text"
        ],
        "intervals_popdens": [
            "Explanatory Text"
        ],
        "intervals_schooldist": [
            "Explanatory Text"
        ],
        "intervals_bike": [
            "Explanatory Text"
        ],
        "intervals_natural": [
            "Explanatory Text"
        ],
        "intervals_parking": [
            "Explanatory Text"
        ],
        "intervals_social": [
            "Explanatory Text"
        ],
        "transport_popdens": [
            "Explanatory Text"
        ],
        "transport_schooldist": [
            "Explanatory Text"
        ],
        "transport_bike": [
            "Explanatory Text"
        ],
        "transport_natural": [
            "Explanatory Text"
        ],
        "transport_parking": [
            "Explanatory Text"
        ],
        "transport_social": [
            "Explanatory Text"
        ],
        "popdens_schooldist": [
            "Explanatory Text"
        ],
        "popdens_bike": [
            "Explanatory Text"
        ],
        "popdens_natural": [
            "Explanatory Text"
        ],
        "popdens_parking": [
            "Explanatory Text"
        ],
        "popdens_social": [
            "Explanatory Text"
        ],
        "schooldist_bike": [
            "Explanatory Text"
        ],
        "schooldist_natural": [
            "Explanatory Text"
        ],
        "schooldist_parking": [
            "Explanatory Text"
        ],
        "schooldist_social": [
            "Explanatory Text"
        ],
        "bike_natural": [
            "Explanatory Text"
        ],
        "bike_parking": [
            "Explanatory Text"
        ],
        "bike_social": [
            "Explanatory Text"
        ],
        "natural_parking": [
            "Explanatory Text"
        ],
        "natural_social": [
            "Explanatory Text"
        ],
        "parking_social": [
            "Explanatory Text"
        ]
    };

    var layer_text: string = "";
    if (Object.keys(LAYER_TEXT).includes(this_layer)) {
        layer_text = meanVarIndex ? LAYER_TEXT[this_layer][meanVarIndex] : LAYER_TEXT[this_layer][0];
    }

    return layer_text;
}
