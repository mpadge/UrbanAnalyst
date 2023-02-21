
export interface PartialViewState {
    latitude: number,
    longitude: number,
    zoom: number
}

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
    initialViewState: {
        latitude: number,
        longitude: number,
        zoom: number
    }
    dataRanges: {
        social_index: number[],
        transport_rel: number[],
        transport_abs: number[],
        uta_rel: number[],
        uta_abs: number[]
    }
}

export interface CitiesDataProps {
    citiesArray: CityDataProps[]
}

export interface MapProps {
    idx: number,
    layer: string,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleViewStateChange: (pViewState: ViewState) => void
    handleLayerChange: (layer: string) => void
}

export interface ControlProps {
    idx: number,
    layer: string,
    citiesArray: CityDataProps[],
    viewState: ViewState
    handleIdxChange: (pIdx: number) => void
    handleViewStateChange: (pViewState: ViewState) => void
    handleLayerChange: (layer: string) => void
}

export interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void
}

export interface LayerListProps {
    layer: string,
    handleLayerChange: (layer: string) => void
}
