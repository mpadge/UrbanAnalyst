
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
    citiesArray: CityDataProps[]
}

export interface MapProps {
    idx: number,
    viewport: Viewport,
    citiesArray: CityDataProps[],
    handleViewportChange: (pViewport: Viewport) => void
}

export interface ControlProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewport: Viewport
    handleIdxChange: (pIdx: number) => void
    handleViewportChange: (pViewport: Viewport) => void
}

export interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewport: Viewport,
    handleIdxChange: (pIdx: number) => void,
}

export interface CityShowProps {
    idx: number,
    citiesArray: CityDataProps[],
}
