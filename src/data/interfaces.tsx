
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

export interface MapProps {
    idx: number,
    layer: string,
    alpha: number,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
}

export interface MapsControlProps {
    idx: number,
    layer: string,
    alpha: number,
    explain: any,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    handleExplainChange: (explain: any) => void
}

export interface StatsControlProps {
    idx: number,
    layer: string,
    meanVals: boolean,
    explain: any,
    sortOpt: string,
    citiesArray: CityDataProps[],
    handleLayerChange: (layer: string) => void,
    handleMeanChange: (meanVals: boolean) => void,
    handleSortChange: (sortOpt: string) => void,
    handleExplainChange: (explain: any) => void
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

export interface SortOrderListProps {
    sortOpt: string,
    handleSortChange: (sortOpt: string) => void
}

export interface LegendProps {
    idx: number,
    layer: string,
    alpha: number,
    citiesArray: CityDataProps[]
}

export interface OpacitySliderProps {
    alpha: number,
    handleAlphaChange: (pAlpha: number) => void
}

export interface StatsProps {
    idx: number,
    layer: string,
    meanVals: boolean,
    sortOpt: string,
    citiesArray: CityDataProps[]
}

export interface ExplainButtonProps {
    explain: boolean,
    handleExplainChange: (explain: boolean) => void
}
export interface MapsExplainProps {
    idx: number,
    layer: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export interface StatsExplainProps {
    idx: number,
    layer: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export interface ButtonProps {
    buttons: {
        first: string,
        second: string,
        third?: string
    }
}

export interface MeanAvgProps {
    meanVals: boolean,
    handleMeanChange: (mn: boolean) => void
}
