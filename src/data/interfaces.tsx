
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
    dataIntervals: {
        social_index: number[],
        times_rel: number[],
        times_abs: number[],
        transfers: number[],
        intervals: number[],
        transport: number[],
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
        transport: number[],
        popdens: number[],
        school_dist: number[],
        bike_index: number[],
        natural: number[],
        parking: number[]
    },
    stats_paired: {
        "intervals.bike": number,
        "transport.parking": number,
        "transport.bike": number,
        "times_abs.bike": number,
        "times_abs.natural": number,
        "intervals.natural": number,
        "intervals.parking": number,
        "social.bike": number,
        "times_abs.transfers": number,
        "intervals.school_dist": number,
        "transport.natural": number,
        "times_abs.school_dist": number,
        "school_dist.natural": number,
        "social.natural": number,
        "intervals.social": number,
        "school_dist.parking": number,
        "transfers.bike": number,
        "transfers.parking": number,
        "school_dist.bike": number,
        "social.school_dist": number,
        "times_rel.natural": number,
        "transfers.natural": number,
        "times_abs.social": number,
        "times_abs.intervals": number,
        "intervals.transport": number,
        "transport.school_dist": number,
        "transport.social": number,
        "times_rel.transfers": number,
        "times_rel.parking": number,
        "transfers.school_dist": number,
        "times_rel.school_dist": number,
        "bike.parking": number,
        "times_rel.social": number,
        "natural.parking": number,
        "transfers.transport": number,
        "times_abs.parking": number,
        "transfers.social": number,
        "times_abs.transport": number,
        "transfers.intervals": number,
        "times_rel.intervals": number,
        "times_rel.times_abs": number,
        "bike.natural": number,
        "times_abs.popdens": number,
        "intervals.popdens": number,
        "school_dist.popdens": number,
        "social.popdens": number,
        "natural.popdens": number,
        "times_rel.popdens": number,
        "transfers.popdens": number,
        "parking.popdens": number,
        "bike.popdens": number,
        "times_rel.transport": number,
        "times_rel.bike": number,
        "transport.popdens": number,
        "social.parking": number,
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
