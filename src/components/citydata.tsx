
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
    }
}

export const CITY_DATA = {
    "citiesArray": [berlin, hamburg, paris]
};
