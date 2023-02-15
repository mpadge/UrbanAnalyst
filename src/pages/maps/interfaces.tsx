
export interface PartialViewport {
    latitude: number,
    longitude: number,
    zoom: number
}

export interface Viewport {
    latitude: number,
    longitude: number,
    zoom: number
    maxZoom: number,
    pitch: number,
    bearing: number,
    width?: number,
    height?: number
}

export interface CityDataProps {
    name: string,
    nameFormatted: string,
    path: string,
    initialViewport: {
        latitude: number,
        longitude: number,
        zoom: number
    }
}

export interface CitiesDataProps {
    Data: CityDataProps[]
}

export interface MapProps {
    idx: number,
    citiesData: CitiesDataProps,
    initialViewport: Viewport
}

export interface ControlProps {
    idx: number,
    citiesData: CitiesDataProps,
    handleIdxChange: (pIdx: number) => void
}

export interface CityListProps {
    idx: number,
    citiesData: CitiesDataProps,
    handleIdxChange: (pIdx: number) => void,
}

export interface CityShowProps {
    idx: number,
    citiesData: CitiesDataProps,
}
