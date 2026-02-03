
export type DataRangeKeys = "social_index" | "times_rel" | "times_abs" |
    "transfers" | "intervals" | "transport" | "popdens" | "school_dist" |
    "bike_index" | "natural" | "parking";

export type Data2RangeKeys = "timesrel_timesabs" | "timesrel_transfers" |
    "timesrel_intervals" | "timesrel_transport" | "timesrel_popdens" |
    "timesrel_schooldist" | "timesrel_bike" | "timesrel_natural" |
    "timesrel_parking" | "timesrel_social" | "timesabs_transfers" |
    "timesabs_intervals" | "timesabs_transport" | "timesabs_popdens" |
    "timesabs_schooldist" | "timesabs_bike" | "timesabs_natural" |
    "timesabs_parking" | "timesabs_social" | "transfers_intervals" |
    "transfers_transport" | "transfers_popdens" | "transfers_schooldist" |
    "transfers_bike" | "transfers_natural" | "transfers_parking" |
    "transfers_social" | "intervals_transport" | "intervals_popdens" |
    "intervals_schooldist" | "intervals_bike" | "intervals_natural" |
    "intervals_parking" | "intervals_social" | "transport_popdens" |
    "transport_schooldist" | "transport_bike" | "transport_natural" |
    "transport_parking" | "transport_social" | "popdens_schooldist" |
    "popdens_bike" | "popdens_natural" | "popdens_parking" | "popdens_social" |
    "schooldist_bike" | "schooldist_natural" | "schooldist_parking" |
    "schooldist_social" | "bike_natural" | "bike_parking" | "bike_social" |
    "natural_parking" | "natural_social" | "parking_social";

export interface ViewState {
    latitude: number,
    longitude: number,
    zoom: number
    maxZoom?: number,
    pitch: number,
    bearing: number,
    width?: number,
    height?: number
}

export interface CityDataProps {
    name: string,
    nameFormatted: string,
    path: string,
    social_index: string,
    initialViewState: {
        latitude: number,
        longitude: number,
        zoom: number
    },
    dataRanges: {
        [key: string]: number[]
    },
    dataRangesPaired: {
        [key: string]: number[]
    },
    stats_single: {
        [key: string]: number[]
    },
    stats_paired: {
        [key: string]: number
    }
}

export interface CitiesDataProps {
    citiesArray: CityDataProps[]
}

export interface LayerListProps {
    layer: DataRangeKeys,
    handleLayerChange: (layer: DataRangeKeys) => void
}

export interface LayersListProps {
    layer: string,
    varnames: string[],
    handleVarnamesChange: (varnames: string[]) => void
}

export interface NumLayersProps {
    numLayers: "Single" | "Paired",
    numLayersOptions: ("Single" | "Paired")[],
    handleNumLayersChange: (numLayers: "Single" | "Paired") => void
}

export interface ExplainButtonProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export interface CalculateButtonProps {
    calculate: boolean,
    handleCalculateChange: (calculate: boolean) => void
}

export interface LayersButtonProps {
    showLayersDialog: boolean,
    handleLayersDialogVisibility: (showLayersDialog: boolean) => void
}

export interface ButtonProps {
    buttons: {
        first: string,
        second: string,
        third: string
        fourth?: string
        fifth?: string
    }
}

export interface ButtonAppProps {
    text: string[];
}
