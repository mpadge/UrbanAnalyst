
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
    "social_index": "Overall Social Inequality Index (2022), from https://fbinter.stadt-berlin.de/fb/index.jsp. High values represent high social inequality.",
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
    },
    "statistics": {
        "social_index": [1.65, 1],
        "transport_rel": [1.14, 0.17],
        "transport_abs": [41.21, 1.83],
        "uta_rel": [1.13, 0.1],
        "uta_abs": [41.19, 1.24],
        "sd_uta2trans_rel": [0.59],
        "sd_uta2trans_abs": [0.68]
    }
}

const hamburg = {
    "name": "hamburg",
    "nameFormatted": "Hamburg",
    "path": "/data/hamburg/data.json",
    "social_index": "Social Monitoring 'Integrated Urban Development' Overall Index, from https://www.metaver.de/trefferanzeige?docuuid=9499E840-3B3C-415A-8F35-856AEE649BCA",
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
    },
    "statistics": {
        "social_index": [5.27, 2.33],
        "transport_rel": [1.22, 0.29],
        "transport_abs": [39.37, 1.77],
        "uta_rel": [1.16, 0.39],
        "uta_abs": [39.3, 2.11],
        "sd_uta2trans_rel": [1.32],
        "sd_uta2trans_abs": [1.19]
    }
}

const mannheim = {
    "name": "mannheim",
    "nameFormatted": "Mannheim",
    "path": "/data/mannheim/data.json",
    "social_index": "Rates of unemployment, from https://www.gis-mannheim.de/mannheim/",
    "initialViewState": {
        "latitude": 49.49,
        "longitude": 8.50,
        "zoom": 10
    },
    "dataRanges": {
        "social_index": [2.10000, 12.10000],
        "transport_rel": [1.67870, 2.77000],
        "transport_abs": [40.38067, 44.37934],
        "uta_rel": [1.53000, 2.97000],
        "uta_abs": [40.62375, 45.20000]
    },
    "dataIntervals": {
        "social_index": [4, 6, 8, 10, 12],
        "transport_rel": [1.8, 2, 2.2, 2.4, 2.6],
        "transport_abs": [40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44],
        "uta_rel": [1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8],
        "uta_abs": [41, 42, 43, 44, 45]
    },
    "statistics": {
        "social_index": [5.12, 2.92],
        "transport_rel": [2.17, 0.38],
        "transport_abs": [42.52, 0.97],
        "uta_rel": [2.09, 0.46],
        "uta_abs": [42.5, 1.43],
        "sd_uta2trans_rel": [1.22],
        "sd_uta2trans_abs": [1.48]
    }
}

const paris = {
    "name": "paris",
    "nameFormatted": "Paris",
    "path": "/data/paris/data.json",
    "social_index": "Rates of unemployment, from https://opendata.apur.org/datasets/Apur::recensement-iris-emploi/",
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
    },
    "statistics": {
        "social_index": [13.83, 6.29],
        "transport_rel": [1.06, 0.21],
        "transport_abs": [40, 1.69],
        "uta_rel": [0.79, 0.86],
        "uta_abs": [39.67, 5.18],
        "sd_uta2trans_rel": [4.02],
        "sd_uta2trans_abs": [3.06]
    }
}

export const CITY_DATA = {
    "citiesArray": [berlin, hamburg, mannheim, paris]
};
