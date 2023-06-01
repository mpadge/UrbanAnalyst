
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
            "The average of the fastest times taken to travel 10km from every point in a city using multi-modal transport via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better. Values are also weighted by local population densities, so represent average times of fastest journeys per person within each polygon.",
            "Variation in the average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are on a scale of minutes. Lower values represent less variation in travel times across the city."
            ],

        "timesrel": [
            "The ratio of absolute travel times for distances of 10 kilometres using any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. Values are weighted by local population densities, so represent average relative times of fastest journeys per person within each polygon. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: Lower values mean that faster public transport is faster relation to equivalent automobile times, meaning people will be more likely to use it.",
            "Variation in the ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Lower values imply lower variation across a city in the ratios of multi-modal versus private automobile travel times."
        ],
        "transfers": [
            "Numbers of transfers for the public transport section of multi-modal journeys per 10km of travel. Values are averaged for each point of origin over all possible journeys out to 10km, with values within polygons being averages over all points or origin with each polygon. Values are weighted by local population densities, so represent average numbers of transfers per person within each polygon."
        ],
        "intervals": [
            "Intervals (in minutes) between public the fastest public transport trip and the subsequent equivalent trips (which may be slower than the first trip). Intervals are averaged for each point of origin over all possible journeys out to 10km, with values within polygons being averages over all points or origin with each polygon. Values are weighted by local population densities, so represent average intervals per person within each polygon. This provides a direct measure of the frequency of public transport services."
        ],
        "transport": [
            "Combined measure of transport time times number of transfers times intervals between services. Values may be directly compared between different locations, and different cities. Lower values indicate public transport that is fast, frequent, and requires few transfers."
        ],
        "popdens": [
            "Population density, in units of thousands of people per square kilometre."
        ],
        "schooldist": [
            "Average distance to nearest school (in kilometres). Single values are calculated for every street junction within each polygon, as the distance to the nearest school. Values for each polygon are then averaged over these single distances for every street junction within the polygon, weighted by population density so that final values are average distance per person."
        ],
        "bike": [
            "Bicycle Index, measured as one minus the proportion of all journeys from each street junction within each polygon out to a distance of 5km travelling along dedicated bicycle infrastructure. Values of zero imply all journeys on dedicated bicycle ways, while values of one imply all journeys directly alongside automobiles, with no bicycle infrastructure at all. Unlike static aggregations of lengths of dedicated bicycle infrastructure, this index provides direct insight into the proportions of all journeys actually spent cycling along appropriate infrastructure."
        ],
        "natural": [
            "Index of accessibility to natural spaces, measured as one minus the proportion of all walking journeys from each street junction within each polygon out to a distance of 2km travelling through or alongside natural spaces. Natural spaces include any publicly accessible areas with natural surfaces, as well as all bodies of water with publicly accessible ways along the sides. Unlike static aggregations of areas of natural space, this index provides direct insight into the proportions of all journeys actually spent walking within or alongside natural spaces."
        ],
        "parking": [
            "Parking index, as a (logarithmically) re-scaled measure of numbers of parking spaces per unit building volume. Lower values imply fewer available parking spaces for a given volume of building. Values for each street junction within a polygon are averaged across all nearby parking spaces, inversely weighted by distance. Each point is the described by a single measure of average number of nearby spaces per volume of nearby buildings. Values within each polygon are then population-density average values of these, providing final measures of average parking availability per person."
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
            "Absolute travel times multiplied by numbers of transfers."
        ],
        "timesabs_intervals": [
            "Absolute travel times multiplied by intervals between consecutive services."
        ],
        "timesabs_transport": [
            "Absolute travel times multiplied by compound transport index. These values will generally not mean anything."
        ],
        "timesabs_popdens": [
            "Absolute travel times multiplied by population densities.."
        ],
        "timesabs_schooldist": [
            "Absolute travel times multiplied by distances to nearest schools."
        ],
        "timesabs_bike": [
            "Absolute travel times multiplied by bicycle index."
        ],
        "timesabs_natural": [
            "Absolute travel times multiplied by index of accessibility to natural spaces."
        ],
        "timesabs_parking": [
            "Absolute travel times multiplied by parking index."
        ],
        "timesabs_social": [
            "Absolute travel times multiplied by social index (rescaled to average of one)."
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
