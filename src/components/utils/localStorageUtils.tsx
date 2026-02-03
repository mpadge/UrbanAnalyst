import { DataRangeKeys, Data2RangeKeys, CityDataProps } from '@/data/interfaces';

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

export function loadInitialState() {
    return {
        idx: localStorageHelpers.getInt('uaCityIdx', 0),
        layer: localStorageHelpers.getString('uaLayer', 'social_index'),
        layer2: localStorageHelpers.getString('uaLayer2', ''),
        numLayers: localStorageHelpers.getString('uaNumLayers', 'Single'),
        alpha: localStorageHelpers.getFloat('uaAlpha', 0.5)
    };
}
