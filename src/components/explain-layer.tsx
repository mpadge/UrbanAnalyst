
interface LayerTextProps {
    [key: string]: string[]
}


export function GetLayerText(layer: string, meanVarIndex: number): string {
    
    const LAYER_TEXT: LayerTextProps = {

        "social_index": ["Representative socio-demographic data such as unemployment rates, deprivation indices, inequality indices, or other indices of social disadvantage."],

        "times_abs": [
            "The average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
            "Variation in the average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are on a scale of minutes. Lower values represent less variation in travel times across the city."
            ],

        "times_rel": [
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
        "school_dist": [
            "Distance to nearest school (in kilometres)"
        ],
        "bike_index": [
            "Bicycle Index"
        ],
        "natural": [
            "Nature Index"
        ],
        "parking": [
            "Parking index"
        ]
    };

    const lt: string = meanVarIndex ? LAYER_TEXT[layer][meanVarIndex] : LAYER_TEXT[layer][0];

    return lt;
}
