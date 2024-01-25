
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
    layer: string,
    handleLayerChange: (layer: string) => void
}

export interface LayersListProps {
    layer: string,
    layers: string[],
    handleLayersChange: (layers: string[]) => void
}

export interface NumLayersProps {
    numLayers: string,
    numLayersOptions: string[],
    handleNumLayersChange: (layer: string) => void
}

export interface ExplainButtonProps {
    explain: boolean,
    handleExplainChange: (explain: boolean) => void
}

export interface CalculateButtonProps {
    calculate: boolean,
    handleCalculateChange: (calculate: boolean) => void
}

export interface ButtonProps {
    buttons: {
        first: string,
        second: string,
        third?: string
        fourth?: string
    }
}
