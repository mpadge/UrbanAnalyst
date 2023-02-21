
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
    }
}

export const CITY_DATA = {
    "citiesArray": [berlin, hamburg, paris]
};
