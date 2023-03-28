
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
        social_index: number[],
        transport_rel: number[],
        transport_abs: number[],
        uta_rel: number[],
        uta_abs: number[]
    },
    dataIntervals: {
        social_index: number[],
        transport_rel: number[],
        transport_abs: number[],
        uta_rel: number[],
        uta_abs: number[]
    },
    statistics: {
        social_index: number[],
        transport_rel: number[],
        transport_abs: number[],
        uta_rel: number[],
        uta_abs: number[],
        sd_uta2trans_rel: number[],
        sd_uta2trans_abs: number[]
    }
}

export interface CitiesDataProps {
    citiesArray: CityDataProps[]
}

export interface LayerListProps {
    layer: string,
    handleLayerChange: (layer: string) => void
}

export interface ExplainButtonProps {
    explain: boolean,
    handleExplainChange: (explain: boolean) => void
}

export interface ButtonProps {
    buttons: {
        first: string,
        second: string,
        third?: string
        fourth?: string
    }
}
