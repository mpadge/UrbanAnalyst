
interface LayerTextProps {
    [key: string]: string[]
}


// Explanatory text for all individual layers plus combined layers for maps
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
            "Numbers of transfers for the public transport section of multi-modal journeys per 10km of travel. Values are averaged for each point of origin over all possible journeys out to 10km. Values are also weighted by local population densities, so represent average numbers of transfers per person within each polygon."
        ],
        "intervals": [
            "Intervals (in minutes) between the fastest public transport trip and the subsequent equivalent trips (which may be slower than the first trip). Intervals are averaged for each point of origin over all possible journeys out to 10km. Values are also weighted by local population densities, so represent average intervals per person. This provides a direct measure of the frequency of public transport services."
        ],
        "transport": [
            "Combined measure of transport time times intervals between services. Values may be directly compared between different locations, and different cities. Lower values indicate public transport that is both fast and frequent."
        ],
        "popdens": [
            "Population density, in units of thousands of people per square kilometre."
        ],
        "schooldist": [
            "Average distance to nearest school (in metres). Single values are calculated for every street junction as the distance to the nearest school. Values are also weighted by population density so that final values are average distance per person."
        ],
        "bike": [
            "Bicycle Index, with lower values indicating more or better bicycle infrastructure. The index is measured as one minus the proportion of all journeys from each street junction out to a distance of 5km travelling along dedicated bicycle infrastructure. Values of zero imply all journeys on dedicated bicycle ways, while values of one imply all journeys directly alongside automobiles, with no bicycle infrastructure at all. Unlike static aggregations of lengths of dedicated bicycle infrastructure, this index provides direct insight into the proportions of all journeys actually spent cycling along appropriate infrastructure."
        ],
        "natural": [
            "Index of accessibility to natural spaces, with lower values indicating greater amounts of natural spaces, greater access to these, or both. The index is measured as one minus the proportion of all walking journeys from each street junction out to a distance of 2km travelling through or alongside natural spaces. Natural spaces include any publicly accessible areas with natural surfaces, as well as all bodies of water with publicly accessible ways along the sides. Unlike static aggregations of areas of natural space, this index provides direct insight into the proportions of all journeys actually spent walking within or alongside natural spaces."
        ],
        "parking": [
            "Parking index, as a (logarithmically) re-scaled measure of numbers of parking spaces per unit building volume. Lower values imply fewer available parking spaces for a given volume of building. Values for each street junction within a polygon are averaged across all nearby parking spaces, inversely weighted by distance. Each point is the described by a single measure of average number of nearby spaces per volume of nearby buildings. Final values are then population-density average values of these, as a measure of average parking availability per person."
        ],
        "value": [
            "House value in US dollars per room, from US Government census data for 2020."
        ],
        "rent": [
            "Montly rent paid in US dollars per room, from US Government census data for 2020."
        ],

        "timesrel_timesabs": [
            "Multiple of relative and absolute travel times. These two variables are generally strongly related, and this statistic should be interpreted with caution. Lower values represent faster travel both in absolute terms, and relativve to equivalent travel times in private automobiles."
        ],
        "timesrel_transfers": [
            "Relative travel times multiplied by numbers of transfers. Lower values represent lower travel times (faster transport) combined with fewer numbers of transfers."
        ],
        "timesrel_intervals": [
            "Relative travel times multiplied by intervals between consecutive services. Lower values represent lower travel times (faster transport) combined with shorter intervals between consecutive services."
        ],
        "timesrel_transport": [
            "Relative travel times multiplied by compound transport index. The combined index already includes relative transport times, and these values will generally not mean anything."
        ],
        "timesrel_popdens": [
            "Relative travel times multiplied by population densities. Lower values indicate regions with fast relative transport yet lower population densities."
        ],
        "timesrel_schooldist": [
            "Relative travel times multiplied by distances to nearest schools. Lower values reflect fast transport relative to equivalent automobile times coupled with short distances to schools."
        ],
        "timesrel_bike": [
            "Relative travel times multiplied by bicycle index. Lower values reflect fast transport relative to equivalent automobile times couplied with good provision of bicycle infrastructure."
        ],
        "timesrel_natural": [
            "Relative travel times multiplied by index of accessibility to natural spaces. Lower values reflect fast transport relative to equivalent automobile times coupled with good access to natural spaces."
        ],
        "timesrel_parking": [
            "Relative travel times multiplied by parking index. Lower values reflect fast transport relative to equivalent automobile times coupled with lower availability of automobile parking spaces."
        ],
        "timesrel_rent": [
            "Relative travel times multiplied by median monthly rent per room. Lower values reflect lower multi-modal travel times (faster transport) compared with equivalent automobile times, combined with lower monthly rent."
        ],
        "timesrel_value": [
            "Relative travel times multiplied by median house prices per room. Lower values reflect lower multi-modal travel times (faster transport) compared with equivalent automobile times, combined with lower monthly rent."
        ],
        "timesrel_social": [
            "Relationship between welative travel times and social index. Lower (more negative) values reflect lower multi-modal travel times (faster transport) compared with equivalent automobile times, combined with disadvantageous social conditions."
        ],
        "timesabs_transfers": [
            "Absolute travel times multiplied by numbers of transfers. Lower values represent lower travel times (faster transport) combined with fewer numbers of transfers."
        ],
        "timesabs_intervals": [
            "Absolute travel times multiplied by intervals between consecutive services. Lower values represent lower travel times (faster transport) combined with shorter intervals between consecutive services."
        ],
        "timesabs_transport": [
            "Absolute travel times multiplied by compound transport index. The combined index already includes absolute transport times, and these values will generally not mean anything."
        ],
        "timesabs_popdens": [
            "Absolute travel times multiplied by population densities. Lower values indicate regions with fast transport yet lower population densities."
        ],
        "timesabs_schooldist": [
            "Absolute travel times multiplied by distances to nearest schools Lower values reflect fast transport coupled with short distances to schools."
        ],
        "timesabs_bike": [
            "Absolute travel times multiplied by bicycle index. Lower values reflect fast transport coupled with good provision of bicycle infrastructure."
        ],
        "timesabs_natural": [
            "Absolute travel times multiplied by index of accessibility to natural spaces. Lower values reflect fast transport coupled with good access to natural spaces."
        ],
        "timesabs_parking": [
            "Absolute travel times multiplied by parking index. Lower values reflect fast transport coupled with lower availability of automobile parking spaces."
        ],
        "timesabs_rent": [
            "Median monthly rent per room times absolute travel times. Lower values reflect lower multi-modal travel times (faster transport), combined with lower monthly rent."
        ],
        "timesabs_value": [
            "Median house prices per room times absolute travel times. Lower values reflect lower multi-modal travel times (faster transport), combined with lower house prices."
        ],
        "timesabs_social": [
            "Relationship between social index and absolute travel times. Lower (more negative) values reflect lower multi-modal travel times (faster transport), combined with disadvantageous social conditions."
        ],
        "transfers_intervals": [
            "Numbers of transfers multiplied by intervals between consecutive services. Lower values represent short intervals between consecutive transport services combined with fewer transfers within journeys."
        ],
        "transfers_transport": [
            "Numbers of transfers multiplied by compound transport index. Numbers of transfers are already included in the compound transport index, and these values will generally not mean anything."
        ],
        "transfers_popdens": [
            "Numbers of transfers multiplied by population densities. Low values represent transport services requiring fewer transfers coupled with low population density."
        ],
        "transfers_schooldist": [
            "Numbers of transfers multiplied by distances to nearest schools. Low values represent transport services requiring fewer transfers coupled with short distances to schools."
        ],
        "transfers_bike": [
            "Numbers of transfers multiplied by bicycle index. Low values represent transport services requiring fewer transfers coupled with good provision of bicycle infrastructure."
        ],
        "transfers_natural": [
            "Numbers of transfers multiplied by index of accessibility to natural spaces. Low values represent transport services requiring fewer transfers coupled with good access to natural spaces."
        ],
        "transfers_parking": [
            "Numbers of transfers multiplied by parking index. Low values represent transport services requiring fewer transfers coupled with lower availability of automobile parking spaces."
        ],
        "transfers_rent": [
            "Numbers of transfers multiplied by median monthly rent per room. Low values represent transport services requiring fewer transfers coupled with lower monthly rent."
        ],
        "transfers_value": [
            "Numbers of transfers multiplied by median house prices per room. Low values represent transport services requiring fewer transfers coupled with lower house prices."
        ],
        "transfers_social": [
            "Relationship between numbers of transfers and social index. Low (more negative) values represent transport services requiring fewer transfers coupled with disadvantageous social conditions."
        ],
        "intervals_transport": [
            "Transport intervals multiplied by compound transport index. Transport intervals are already included in the compound transport index, and these values will generally not mean anything."
        ],
        "intervals_popdens": [
            "Transport intervals multiplied by population densities. Low values represent transport with shorter intervals between consecutive services coupled with low population density."
        ],
        "intervals_schooldist": [
            "Transport intervals multiplied by distances to nearest schools. Low values represent transport with shorter intervals between consecutive services coupled with shorter distances to schools."
        ],
        "intervals_bike": [
            "Transport intervals multiplied by bicycle index. Low values represent transport with shorter intervals between consecutive services coupled with good provision of bicycle infrastructure."
        ],
        "intervals_natural": [
            "Transport intervals multiplied by index of accessibility to natural spaces. Low values represent transport with shorter intervals between consecutive services coupled with good access to natural spaces."
        ],
        "intervals_parking": [
            "Transport intervals multiplied by parking index. Low values represent transport with shorter intervals between consecutive services coupled with lower availability of automobile parking spaces."
        ],
        "intervals_rent": [
            "Transport intervals multiplied by median monthly rent per room. Low values represent transport with shorter intervals between consecutive services coupled with lower monthly rent."
        ],
        "intervals_value": [
            "Transport intervals multiplied by median house prices per room. Low values represent transport with shorter intervals between consecutive services coupled with lower house prices."
        ],
        "intervals_social": [
            "Relationship between transport intervals and social index. Low (more negative) values represent transport with shorter intervals between consecutive services coupled with disadvantageous social conditions."
        ],
        "transport_popdens": [
            "Compound transport index multiplied by population densities. Low values represent overall good provision of public transport coupled with low population density."
        ],
        "transport_schooldist": [
            "Compound transport index multiplied by distances to nearest schools. Low values represent overall good provision of public transport coupled with short distances to schools."
        ],
        "transport_bike": [
            "Compound transport index multiplied by bicycle index. Low values represent overall good provision of public transport coupled with good provision of bicycle infrastructure."
        ],
        "transport_natural": [
            "Compound transport index multiplied by index of accessibility to natural spaces. Low values represent overall good provision of public transport coupled with good access to natural spaces."
        ],
        "transport_parking": [
            "Compound transport index multiplied by parking index. Low values represent overall good provision of public transport coupled with lower availability of automobile parking spaces."
        ],
        "transport_rent": [
            "Compound transport index multiplied by median monthly rent per room. Low values represent overall good provision of public transport coupled with lower monthly rent."
        ],
        "transport_value": [
            "Compound transport index multiplied by median house prices per room. Low values represent overall good provision of public transport coupled with lower house prices."
        ],
        "transport_social": [
            "Relationship between compound transport index multiplied by social index. Low (more negative) values represent overall good provision of public transport coupled with disadvantageous social conditions."
        ],
        "popdens_schooldist": [
            "Population density multiplied by distances to nearest schools. Low (negative) values represent high population density coupled with short distances to schools."
        ],
        "popdens_bike": [
            "Population density multiplied by bicycle index. Low values represent low population density coupled with good provision of bicycle infrastructure."
        ],
        "popdens_natural": [
            "Population density multiplied by index of accessibility to natural spaces. Low values represent low population density coupled with good access to natural spaces."
        ],
        "popdens_parking": [
            "Population density multiplied by parking index. Low values represent low population density coupled with lower availability of automobile parking spaces."
        ],
        "popdens_rent": [
            "Population density multiplied by median monthly rent per room. Low values represent low population density coupled with lower monthly rent."
        ],
        "popdens_value": [
            "Population density multiplied by median house prices per room. Low values represent low population density coupled with lower house prices."
        ],
        "popdens_social": [
            "Relationship between population density and social index. Low (more negative) values represent low population density coupled with disadvantageous social conditions."
        ],
        "schooldist_bike": [
            "Distance to nearest school multiplied by bicycle index. Low values represent shorter distances to schools coupled with good provision of bicycle infrastructure."
        ],
        "schooldist_natural": [
            "Distance to nearest school multiplied by index of accessibility to natural spaces. Low values indicate shorter distances to schools coupled with good access to natural spaces."
        ],
        "schooldist_parking": [
            "Distance to nearest school multiplied by parking index. Low values represent shorter distances to schools coupled with lower availability of automobile parking spaces."
        ],
        "schooldist_rent": [
            "Distance to nearest school multiplied by median monthly rent per room. Low values indicate shorter distances to schools coupled with lower monthly rent."
        ],
        "schooldist_value": [
            "Distance to nearest school multiplied by median house prices per room. Low values indicate shorter distances to schools coupled with lower house prices."
        ],
        "schooldist_social": [
            "Relationship between distance to nearest school and social index. Low (more negative) values indicate shorter distances to schools coupled with disadvantageous social conditions."
        ],
        "bike_natural": [
            "Bicycle infrastructure index multiplied by index of accessibility to natural spaces. Low values reflect good access to natural spaces coupled with good provision of bicycle infrastructure."
        ],
        "bike_parking": [
            "Bicycle infrastructure index multiplied by parking index. Low values reflect lower availability of automobile parking spaces coupled with good provision of bicycle infrastructure."
        ],
        "bike_rent": [
            "Bicycle infrastructure index multiplied by median monthly rent per room. Low values reflect good provision of bicycle infrastructure coupled with lower monthly rent."
        ],
        "bike_value": [
            "Bicycle infrastructure index multiplied by median house prices per room. Low values reflect good provision of bicycle infrastructure coupled with lower house prices."
        ],
        "bike_social": [
            "Relationship between bicycle infrastructure index and social index. Low (more negative) values reflect good provision of bicycle infrastructure coupled with disadvantageous social conditions."
        ],
        "natural_parking": [
            "Index of access to natural spaces multiplied by parking index. Low values reflect good access to natural spaces coupled with lower availability of automobile parking spaces."
        ],
        "natural_rent": [
            "Index of access to natural spaces multiplied by median monthly rent per room. Low values indicate that good access to natural spaces is coupled with lower monthly rent."
        ],
        "natural_value": [
            "Index of access to natural spaces multiplied by median house prices per room. Low values indicate that good access to natural spaces is coupled with lower house prices."
        ],
        "natural_social": [
            "Relationship between index of access to natural spaces and social index. Low (more negative) values indicate that good access to natural spaces is coupled with disadvantageous social conditions."
        ],
        "parking_rent": [
            "Parking index multiplied by median monthly rent per room. Low values reflect lower availability of automobile parking spaces coupled with lower monthly rent."
        ],
        "parking_value": [
            "Parking index multiplied by median house prices per room. Low values reflect lower availability of automobile parking spaces coupled with lower house prices"
        ],
        "parking_social": [
            "Relationship between parking index and social index. Low (more negative) values reflect lower availability of automobile parking spaces coupled with disadvantageous social conditions"
        ],
        "rent_value": [
            "Median monthly rent per room multiplied by median house prices per room. Low values reflect lower monthly rent coupled with lower house prices."
        ],
        "rent_social": [
            "Relationship between median monthly rent per room and social index. Low values reflect lower monthly rent coupled with disadvantageous social conditions."
        ],
        "value_social": [
            "Relationship between median house prices per room and ultiplied by social index. Low values reflect lower house prices coupled with disadvantageous social conditions."
        ],
    };

    var layer_text: string = "";
    if (Object.keys(LAYER_TEXT).includes(this_layer)) {
        layer_text = meanVarIndex ? LAYER_TEXT[this_layer][meanVarIndex] : LAYER_TEXT[this_layer][0];
    }

    return layer_text;
}

// Explanatory text for paired 'compare' layers
export function GetLayerTextCompare(layer: string, layer2: string, numLayers: string, meanVarIndex: number, paired_keys: string[]): string {

    const lyr1 = layer.replace("\_", "").replace("index", "");
    const lyr2 = layer2.replace("\_", "").replace("index", "");

    const these_layers = paired_keys.includes(lyr1 + "_" + lyr2) ?
        lyr1 + "_" + lyr2 : lyr2 + "_" + lyr1;
    const this_layer = numLayers == "Single" ? lyr1 : these_layers;

    const LAYER_TEXT: LayerTextProps = {

        "timesrel_transfers": [
            "Strength of relationship between relative travel times and by numbers of transfers. Higher (positive) values represent cities for which lower travel times (faster transport) are strongly related to fewer numbers of transfers. Lower (negative) values represent faster transport being related to higher numbers of transfers."
        ],
        "timesrel_intervals": [
            "Strength of relationship between relative travel times and intervals between consecutive services. Higher (positive) values represent cities for which lower travel times (faster transport) are strongly related to shorter intervals between consecutive services."
        ],
        "timesrel_transport": [
            "Strength of relationship between relative travel times and compound transport index. The combined index already includes relative transport times, and these values will generally not mean anything."
        ],
        "timesrel_popdens": [
            "Strength of relationship between relative travel times and population densities. Lower (negative) values indicate cities with strong relationships between fast relative transport and higher population densities."
        ],
        "timesrel_schooldist": [
            "Strength of relationship between relative travel times and distances to nearest schools. Higher (positive) values represent cities with strong relationships between fast transport relative to equivalent automobile times and short distances to schools."
        ],
        "timesrel_bike": [
            "Strength of relationship between relative travel times bicycle index. Higher (positive) values reflect fast transport relative to equivalent automobile times coupled with good provision of bicycle infrastructure."
        ],
        "timesrel_natural": [
            "Strength of relationship between relative travel times and index of accessibility to natural spaces. Higher (positive) values reflect fast transport relative to equivalent automobile times coupled with good access to natural spaces."
        ],
        "timesrel_parking": [
            "Strength of relationship between relative travel times and parking index. Lower (negative) values reflect fast transport relative to equivalent automobile times coupled with higher availability of automobile parking spaces."
        ],
        "timesrel_rent": [
            "Relative travel times multiplied by median monthly rent per room. Lower values reflect lower multi-modal travel times (faster transport) compared with equivalent automobile times, combined with lower monthly rent."
        ],
        "timesrel_value": [
            "Relative travel times multiplied by median house prices per room. Lower values reflect lower multi-modal travel times (faster transport) compared with equivalent automobile times, combined with lower monthly rent."
        ],
        "timesrel_social": [
            "Strength of relationship between relative travel times and social index. Higher (positive) values reflect lower travel times (faster transport), combined with advantageous social conditions. Lower (negative) values reflect faster relative transport being more strongly associated with disadvantageous social conditions."
        ],
        "timesabs_transfers": [
            "Strength of relationship between absolute travel times and numbers of transfers. Higher (positive) values represent lower travel times (faster transport) combined with fewer numbers of transfers."
        ],
        "timesabs_intervals": [
            "Strength of relationship between absolute travel times and intervals between consecutive services. Higher (positive) values represent lower travel times (faster transport) combined with shorter intervals between consecutive services."
        ],
        "timesabs_transport": [
            "Strength of relationship between absolute travel times and compound transport index. The combined index already includes absolute transport times, and these values will generally not mean anything."
        ],
        "timesabs_popdens": [
            "Strength of relationship between absolute travel times and population densities. Lower (negative) values indicate cities in which fast transport is more strongly related to higher population densities."
        ],
        "timesabs_schooldist": [
            "Strength of relationship between absolute travel times and distances to nearest schools. Higher (positive) values reflect stronger relationships between fast transport and short distances to schools."
        ],
        "timesabs_bike": [
            "Strength of relationship between absolute travel times and bicycle index. Higher (positive) values reflect stronger relationship between fast transport and good provision of bicycle infrastructure."
        ],
        "timesabs_natural": [
            "Strength of relationship between absolute travel times and index of accessibility to natural spaces. Higher (positive) values reflect strong relationship between fast transport and access to natural spaces. Lower (negative) values indicate that good access to natural spaces is related to slower transport times."
        ],
        "timesabs_parking": [
            "Strength of relationship between absolute travel times and parking index. Lower (negative) values represent cities in which fast transport is coupled with higher availability of automobile parking spaces."
        ],
        "timesabs_rent": [
            "Median monthly rent per room times absolute travel times. Lower values reflect lower multi-modal travel times (faster transport), combined with lower monthly rent."
        ],
        "timesabs_value": [
            "Median house prices per room times absolute travel times. Lower values reflect lower multi-modal travel times (faster transport), combined with lower house prices."
        ],
        "timesabs_social": [
            "Strength of relationship between social index times absolute travel times. Positive (higher) values represent cities in which lower travel times (faster transport) are strongly coupled with advantageous social conditions. Lower (negative) values represent a stronger relationship between fast transport and disadvantageous social conditions."
        ],
        "transfers_intervals": [
            "Strength of relationship between numbers of transfers and intervals between consecutive services. Lower values represent cities for which short intervals between consecutive transport services are strongly coupled with fewer transfers within journeys."
        ],
        "transfers_transport": [
            "Strength of relationship between numbers of transfers and compound transport index. Numbers of transfers are already included in the compound transport index, and these values will generally not mean anything."
        ],
        "transfers_popdens": [
            "Strength of relationship between numbers of transfers and population densities. Low (negative)values represent cities in which transport services requiring fewer transfers are coupled with high population density. High (positive) values reflect fewer transfers being more strongly related to lower population densities."
        ],
        "transfers_schooldist": [
            "Strength of relationship between numbers of transfers and distances to nearest schools. Higher (positive) values represent transport services requiring fewer transfers coupled with short distances to schools."
        ],
        "transfers_bike": [
            "Strength of relationship between numbers of transfers and bicycle index. Higher (positive) values represent transport services requiring fewer transfers coupled with good provision of bicycle infrastructure. Lower (negative) values imply good provision of bicycle infrastructure being coupled with greater numbers of transfers."
        ],
        "transfers_natural": [
            "Strength of relationship between numbers of transfers and index of accessibility to natural spaces. High (positive) values represent transport services requiring fewer transfers coupled with good access to natural spaces."
        ],
        "transfers_parking": [
            "Strength of relationship between numbers of transfers and parking index. Low (negative) values represent transport services requiring fewer transfers coupled with higher availability of automobile parking spaces."
        ],
        "transfers_rent": [
            "Numbers of transfers multiplied by median monthly rent per room. Low values represent transport services requiring fewer transfers coupled with lower monthly rent."
        ],
        "transfers_value": [
            "Numbers of transfers multiplied by median house prices per room. Low values represent transport services requiring fewer transfers coupled with lower house prices."
        ],
        "transfers_social": [
            "Strength of relationship between numbers of transfers and social index. Higher (positive) values represent transport services requiring fewer transfers being coupled with advantageous social conditions."
        ],
        "intervals_transport": [
            "Strength of relationship between transport intervals and compound transport index. Transport intervals are already included in the compound transport index, and these values will generally not mean anything."
        ],
        "intervals_popdens": [
            "Strength of relationship between transport intervals and population densities. Low (negative) values represent transport with shorter intervals between consecutive services coupled with high population density."
        ],
        "intervals_schooldist": [
            "Strength of relationship between transport intervals and distances to nearest schools. High (positive) values represent transport with shorter intervals between consecutive services coupled with shorter distances to schools."
        ],
        "intervals_bike": [
            "Strength of relationship between transport intervals and bicycle index. High (positive) values represent transport with shorter intervals between consecutive services coupled with good provision of bicycle infrastructure."
        ],
        "intervals_natural": [
            "Strength of relationship between transport intervals and index of accessibility to natural spaces. High (positive) values represent transport with shorter intervals between consecutive services coupled with good access to natural spaces."
        ],
        "intervals_parking": [
            "Strength of relationship between transport intervals and parking index. Low (negative) values represent transport with shorter intervals between consecutive services coupled with higher availability of automobile parking spaces."
        ],
        "intervals_rent": [
            "Transport intervals multiplied by median monthly rent per room. Low values represent transport with shorter intervals between consecutive services coupled with lower monthly rent."
        ],
        "intervals_value": [
            "Transport intervals multiplied by median house prices per room. Low values represent transport with shorter intervals between consecutive services coupled with lower house prices."
        ],
        "intervals_social": [
            "Strength of relationship between transport intervals and social index. Higher (positive) values represent transport with shorter intervals between consecutive services coupled with advantageous social conditions."
        ],
        "transport_popdens": [
            "Strength of relationship between compound transport index and population densities. Lower (negative) values represent a strong coupling between overall good provision of public transport and high population density."
        ],
        "transport_schooldist": [
            "Strength of relationship between compound transport index and distances to nearest schools. High (positive) values represent overall good provision of public transport coupled with short distances to schools."
        ],
        "transport_bike": [
            "Strength of relationship between compound transport index and bicycle index. High (positive) values represent overall good provision of public transport coupled with good provision of bicycle infrastructure."
        ],
        "transport_natural": [
            "Strength of relationship between compound transport index and index of accessibility to natural spaces. High (positive) values represent overall good provision of public transport coupled with good access to natural spaces."
        ],
        "transport_parking": [
            "Strength of relationship between compound transport index and parking index. Lower (negative) values represent overall good provision of public transport coupled with higher availability of automobile parking spaces."
        ],
        "transport_rent": [
            "Compound transport index multiplied by median monthly rent per room. Low values represent overall good provision of public transport coupled with lower monthly rent."
        ],
        "transport_value": [
            "Compound transport index multiplied by median house prices per room. Low values represent overall good provision of public transport coupled with lower house prices."
        ],
        "transport_social": [
            "Strength of relationship between compound transport index and social index. Lower (negative) values represent overall good provision of public transport coupled with generally less advantageous social conditions."
        ],
        "popdens_schooldist": [
            "Strength of relationship between population density and distances to nearest schools. Lower (negative) values represent shorter distances to schools being more strongly coupled with higher population densities."
        ],
        "popdens_bike": [
            "Strength of relationship between population density and bicycle index. Lower (negative) values represent high population density coupled with good provision of bicycle infrastructure."
        ],
        "popdens_natural": [
            "Strength of relationship between population density and index of accessibility to natural spaces. Lower (negative) values represent high population density coupled with good access to natural spaces."
        ],
        "popdens_parking": [
            "Strength of relationship between population density and parking index. Lower (negative) values represent low population density coupled with higher availability of automobile parking spaces."
        ],
        "popdens_rent": [
            "Population density multiplied by median monthly rent per room. Low values represent low population density coupled with lower monthly rent."
        ],
        "popdens_value": [
            "Population density multiplied by median house prices per room. Low values represent low population density coupled with lower house prices."
        ],
        "popdens_social": [
            "Strength of relationship between population density and social index. Higher (positive) values represent cities for which low population densities are coupled with advantageous social conditions."
        ],
        "schooldist_bike": [
            "Strength of relationship between distance to nearest school and bicycle index. Higher (positive) values represent cities for which shorter distances to schools are coupled with good provision of bicycle infrastructure."
        ],
        "schooldist_natural": [
            "Strength of relationship between distance to nearest school and index of accessibility to natural spaces. Higher (positive) values represent cities for which shorter distances to schools are coupled with good access to natural spaces."
        ],
        "schooldist_parking": [
            "Strength of relationship between distance to nearest school and parking index. Higher (positive) values indicate cities for which shorter distances to schools are coupled with lower availability of automobile parking spaces."
        ],
        "schooldist_rent": [
            "Distance to nearest school multiplied by median monthly rent per room. Low values indicate shorter distances to schools coupled with lower monthly rent."
        ],
        "schooldist_value": [
            "Distance to nearest school multiplied by median house prices per room. Low values indicate shorter distances to schools coupled with lower house prices."
        ],
        "schooldist_social": [
            "Strength of relationship between distance to nearest school and social index. Lower (negative) values indicate cities for which shorter distances to schools are coupled with disadvantageous social conditions."
        ],
        "bike_natural": [
            "Strength of relationship between bicycle infrastructure index and index of accessibility to natural spaces. Higher (positive) values represent cities in which good access to natural spaces is coupled with good provision of bicycle infrastructure."
        ],
        "bike_parking": [
            "Strength of relationship between bicycle infrastructure index and parking index. High (positive) values represent cities in which higher availability of automobile parking spaces is coupled with good provision of bicycle infrastructure."
        ],
        "bike_rent": [
            "Bicycle infrastructure index multiplied by median monthly rent per room. Low values reflect good provision of bicycle infrastructure coupled with lower monthly rent."
        ],
        "bike_value": [
            "Bicycle infrastructure index multiplied by median house prices per room. Low values reflect good provision of bicycle infrastructure coupled with lower house prices."
        ],
        "bike_social": [
            "Strength of relationship between bicycle infrastructure index and social index. Higher (positive) values represent cities in which good provision of bicycle infrastructure is coupled with advantageous social conditions."
        ],
        "natural_parking": [
            "Strength of relationship between index of access to natural spaces and parking index. Higher (positive) values represent cities in which good access to natural spaces is coupled with lower availability of automobile parking spaces."
        ],
        "natural_rent": [
            "Index of access to natural spaces multiplied by median monthly rent per room. Low values indicate that good access to natural spaces is coupled with lower monthly rent."
        ],
        "natural_value": [
            "Index of access to natural spaces multiplied by median house prices per room. Low values indicate that good access to natural spaces is coupled with lower house prices."
        ],
        "natural_social": [
            "Strength of relationship between index of access to natural spaces and social index. Higher (positive) values reflect good access to natural spaces being more strongly coupled with advantageous social conditions; lower (negative) values reflect access to natural spaces being coupled with disadvantageous social conditions."
        ],
        "parking_rent": [
            "Parking index multiplied by median monthly rent per room. Low values reflect lower availability of automobile parking spaces coupled with lower monthly rent."
        ],
        "parking_value": [
            "Parking index multiplied by median house prices per room. Low values reflect lower availability of automobile parking spaces coupled with lower house prices"
        ],
        "parking_social": [
            "Strength of relationship between parking index and social index. Lower (negative) values represent cities in which lower availability of automobile parking spaces is coupled with advantageous social conditions"
        ],
        "rent_value": [
            "Median monthly rent per room multiplied by median house prices per room. Low values reflect lower monthly rent coupled with lower house prices."
        ],
        "rent_social": [
            "Relationship between median monthly rent per room and social index. Low values reflect lower monthly rent coupled with disadvantageous social conditions."
        ],
        "value_social": [
            "Relationship between median house prices per room and ultiplied by social index. Low values reflect lower house prices coupled with disadvantageous social conditions."
        ],
    };

    var layer_text: string = "";
    if (Object.keys(LAYER_TEXT).includes(this_layer)) {
        layer_text = meanVarIndex ? LAYER_TEXT[this_layer][meanVarIndex] : LAYER_TEXT[this_layer][0];
    }

    return layer_text;
}
