
export const DEFAULT_MAP_CONFIG = {
    "initialViewState": {
        "latitude": 52.5,
        "longitude": 13.4,
        "zoom": 10
    }
}

const berlin = {
    "name": "berlin",
    "nameFormatted": "Berlin",
    "path": "/data/berlin/data.json",
    "initialViewState": {
        "latitude": 52.5,
        "longitude": 13.4,
        "zoom": 10
    },
    "dataRanges": {
        "social_index": [0.7000, 2.690],
        "transport_rel": [0.9809, 1.288],
        "transport_abs": [38.6300, 44.040],
        "uta_rel": [1.0370, 1.220],
        "uta_abs": [39.4800, 42.98]
    },
    "dataIntervals": {
        "social_index": [1, 1.4, 1.8, 2.2, 2.6],
        "transport_rel": [1, 1.05, 1.1, 1.15, 1.2, 1.25],
        "transport_abs": [39, 40, 41, 42, 43, 44],
        "uta_rel": [1.06, 1.1, 1.14, 1.18, 1.22],
        "uta_abs": [39.5, 40, 40.5, 41, 41.5, 42, 42.5]
    }
}

const hamburg = {
    "name": "hamburg",
    "nameFormatted": "Hamburg",
    "path": "/data/hamburg/data.json",
    "initialViewState": {
        "latitude": 53.57,
        "longitude": 10.02,
        "zoom": 10
    },
    "dataRanges": {
        "social_index": [7.9500, 11.900],
        "transport_rel": [0.9623, 1.661],
        "transport_abs": [35.9900, 41.990],
        "uta_rel": [0.6875, 1.513],
        "uta_abs": [36.8900, 41.23]
    },
    "dataIntervals": {
        "social_index": [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
        "transport_rel": [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
        "transport_abs": [36, 37, 38, 39, 40, 41],
        "uta_rel": [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
        "uta_abs": [37, 38, 39, 40, 41]
    }
}

const paris = {
    "name": "paris",
    "nameFormatted": "Paris",
    "path": "/data/paris/data.json",
    "initialViewState": {
        "latitude": 48.85,
        "longitude": 2.39,
        "zoom": 10
    },
    "dataRanges": {
        "social_index": [12.400, 37.40],
        "transport_rel": [0.539, 1.70],
        "transport_abs": [35.550, 43.88],
        "uta_rel": [-1.280, 2.80],
        "uta_abs": [29.100, 56.5]
    },
    "dataIntervals": {
        "social_index": [15, 20, 25, 30, 35],
        "transport_rel": [0.6, 0.8, 1, 1.2, 1.4, 1.6],
        "transport_abs": [36, 37, 38, 39, 40, 41, 42, 43],
        "uta_rel": [-1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5],
        "uta_abs": [30, 35, 40, 45, 50, 55]
    }
}

export const CITY_DATA = {
    "citiesArray": [berlin, hamburg, paris]
};
