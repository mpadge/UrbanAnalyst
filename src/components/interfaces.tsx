
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
}

export interface CitiesDataProps {
    citiesArray: CityDataProps[]
}

export interface MapProps {
    idx: number,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleViewStateChange: (pViewState: ViewState) => void
}

export interface ControlProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewState: ViewState
    handleIdxChange: (pIdx: number) => void
    handleViewStateChange: (pViewState: ViewState) => void
}

export interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void
}

export interface CityShowProps {
    idx: number,
    citiesArray: CityDataProps[],
}
