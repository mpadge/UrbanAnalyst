
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

export interface CityData {
    name: string,
    nameFormatted: string,
    path: string,
    initialViewport: {
        latitude: number,
        longitude: number,
        zoom: number
    }
}

export interface citiesData {
    Data: CityData[]
}

export interface MapProps {
    idx: number,
    citiesData: citiesData,
    initialViewport: Viewport
}

export interface ControlProps {
    idx: number,
    citiesData: citiesData,
    handleIdxChange: (pIdx: number) => void
}

export interface CityListProps {
    idx: number,
    citiesData: citiesData,
    handleIdxChange: (pIdx: number) => void,
}

export interface CityShowProps {
    idx: number,
    citiesData: citiesData,
}
