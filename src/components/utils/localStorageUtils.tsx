import { useState, useReducer } from 'react';
import { DataRangeKeys } from '@/data/interfaces';

export const localStorageHelpers = {

    getItem: (key: string): string | null => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }
        return null;
    },

    setItem: (key: string, value: string): void => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, value);
        }
    },

    removeItem: (key: string): void => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(key);
        }
    },

    getInt: (key: string, fallback: number = 0): number => {
        const value = localStorageHelpers.getItem(key);
        if (value) {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? fallback : parsed;
        }
        return fallback;
    },

    getFloat: (key: string, fallback: number = 0.0): number => {
        const value = localStorageHelpers.getItem(key);
        if (value) {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? fallback : parsed;
        }
        return fallback;
    },

    getString: (key: string, fallback: string = ""): string => {
        return localStorageHelpers.getItem(key) || fallback;
    }
};

export const sessionStorageHelpers = {

    getItem: (key: string): string | null => {
        if (typeof window !== "undefined") {
            return sessionStorage.getItem(key);
        }
        return null;
    },

    setItem: (key: string, value: string): void => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(key, value);
        }
    }
};

export function loadInitialState(): { idx: number; layer: string; layer2: string; numLayers: string; alpha: number } {
    return {
        idx: localStorageHelpers.getInt('uaCityIdx', 0),
        layer: localStorageHelpers.getString('uaLayer', 'social_index'),
        layer2: localStorageHelpers.getString('uaLayer2', ''),
        numLayers: localStorageHelpers.getString('uaNumLayers', 'Single'),
        alpha: localStorageHelpers.getFloat('uaAlpha', 0.5)
    };
}

// Storage keys for compare page
export const COMPARE_STORAGE_KEYS = {
    LAYER: 'uaLayer',
    LAYER2: 'uaLayer2', 
    NUM_LAYERS: 'uaNumLayers',
    SORT_OPT: 'uaCompareSortOpt'
} as const;

// Import constants for use in state initialization
import { LAYER_CONSTANTS } from './pageConstants';

// Generic persisted state hook
export function usePersistedState<T>(
    key: string,
    defaultValue: T
): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorageHelpers.getItem(key);
            if (stored) {
                try {
                    return JSON.parse(stored) as T;
                } catch {
                    return defaultValue;
                }
            }
        }
        return defaultValue;
    });

    const setPersistedState = (value: T): void => {
        setState(value);
        if (typeof window !== "undefined") {
            localStorageHelpers.setItem(key, JSON.stringify(value));
        }
    };

    return [state, setPersistedState];
}

// Compare state interface
interface CompareState {
    layer: DataRangeKeys;
    layer2: DataRangeKeys;
    numLayers: "Single" | "Paired";
    sortOpt: string;
    meanVals: boolean;
}

// Compare state reducer
type CompareAction = 
    | { type: "SET_LAYER"; payload: DataRangeKeys }
    | { type: "SET_LAYER2"; payload: DataRangeKeys }
    | { type: "SET_NUM_LAYERS"; payload: "Single" | "Paired" }
    | { type: "SET_SORT_OPT"; payload: string }
    | { type: "TOGGLE_MEAN_VALS" };

function compareReducer(state: CompareState, action: CompareAction): CompareState {
    switch (action.type) {
        case "SET_LAYER":
            return { ...state, layer: action.payload };
        case "SET_LAYER2":
            return { ...state, layer2: action.payload };
        case "SET_NUM_LAYERS":
            return { ...state, numLayers: action.payload };
        case "SET_SORT_OPT":
            return { ...state, sortOpt: action.payload };
        case "TOGGLE_MEAN_VALS":
            return { ...state, meanVals: !state.meanVals };
        default:
            return state;
    }
}

// Consolidated compare state hook
export function useCompareState(): {
    state: CompareState;
    actions: {
        setLayer: (layer: DataRangeKeys) => void;
        setLayer2: (layer2: DataRangeKeys) => void;
        setNumLayers: (numLayers: "Single" | "Paired") => void;
        setSortOpt: (sortOpt: string) => void;
        toggleMeanVals: () => void
    }
} {
    const initialState: CompareState = {
        layer: (localStorageHelpers.getString(COMPARE_STORAGE_KEYS.LAYER, LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER) as DataRangeKeys),
        layer2: (localStorageHelpers.getString(COMPARE_STORAGE_KEYS.LAYER2, LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER) as DataRangeKeys),
        numLayers: (localStorageHelpers.getString(COMPARE_STORAGE_KEYS.NUM_LAYERS, LAYER_CONSTANTS.MODE_SINGLE) as "Single" | "Paired"),
        sortOpt: localStorageHelpers.getString(COMPARE_STORAGE_KEYS.SORT_OPT, 'increasing'),
        meanVals: true
    };

    const [state, dispatch] = useReducer(compareReducer, initialState);

    const actions = {
        setLayer: (layer: DataRangeKeys): void => {
            localStorageHelpers.setItem(COMPARE_STORAGE_KEYS.LAYER, layer);
            dispatch({ type: "SET_LAYER", payload: layer });
        },
        setLayer2: (layer2: DataRangeKeys): void => {
            localStorageHelpers.setItem(COMPARE_STORAGE_KEYS.LAYER2, layer2);
            dispatch({ type: "SET_LAYER2", payload: layer2 });
        },
        setNumLayers: (numLayers: "Single" | "Paired"): void => {
            localStorageHelpers.setItem(COMPARE_STORAGE_KEYS.NUM_LAYERS, numLayers);
            dispatch({ type: "SET_NUM_LAYERS", payload: numLayers });
        },
        setSortOpt: (sortOpt: string): void => {
            localStorageHelpers.setItem(COMPARE_STORAGE_KEYS.SORT_OPT, sortOpt);
            dispatch({ type: "SET_SORT_OPT", payload: sortOpt });
        },
        toggleMeanVals: (): void => {
            dispatch({ type: "TOGGLE_MEAN_VALS" });
        }
    };

    return { state, actions };
}


