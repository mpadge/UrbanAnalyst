
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
        times_rel: number[],
        times_abs: number[],
        transfers: number[],
        intervals: number[],
        popdens: number[],
        school_dist: number[],
        bike_index: number[],
        natural: number[],
        parking: number[]
    },
    dataIntervals: {
        social_index: number[],
        times_rel: number[],
        times_abs: number[],
        transfers: number[],
        intervals: number[],
        popdens: number[],
        school_dist: number[],
        bike_index: number[],
        natural: number[],
        parking: number[]
    },
    stats_single: {
        social_index: number[],
        times_rel: number[],
        times_abs: number[],
        transfers: number[],
        intervals: number[],
        popdens: number[],
        school_dist: number[],
        bike_index: number[],
        natural: number[],
        parking: number[]
    },
    stats_paired: {
        'school_dist.parking': number,
        'intervals.parking': number,
        'school_dist.natural': number,
        'school_dist.bike_index': number,
        'transfers.parking': number,
        'social_index.parking': number,
        'times_rel.parking': number,
        'bike_index.parking': number,
        'intervals.bike_index': number,
        'times_abs.bike_index': number,
        'times_abs.natural': number,
        'intervals.natural': number,
        'social_index.bike_index': number,
        'times_abs.transfers': number,
        'social_index.natural': number,
        'intervals.social_index': number,
        'transfers.bike_index': number,
        'times_rel.natural': number,
        'transfers.natural': number,
        'times_abs.social_index': number,
        'times_abs.intervals': number,
        'school_dist.popdens': number,
        'times_rel.transfers': number,
        'times_rel.social_index': number,
        'transfers.social_index': number,
        'transfers.intervals': number,
        'times_rel.intervals': number,
        'times_rel.times_abs': number,
        'bike_index.natural': number,
        'intervals.school_dist': number,
        'times_abs.school_dist': number,
        'times_abs.popdens': number,
        'intervals.popdens': number,
        'social_index.school_dist': number,
        'transfers.school_dist': number,
        'social_index.popdens': number,
        'natural.popdens': number,
        'times_rel.popdens': number,
        'transfers.popdens': number,
        'times_rel.school_dist': number,
        'bike_index.popdens': number,
        'parking.popdens': number,
        'times_rel.bike_index': number,
        'times_abs.parking': number,
        'natural.parking': number
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
