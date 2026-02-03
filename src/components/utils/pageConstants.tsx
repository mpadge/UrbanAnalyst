// Centralized constants for all page components
export const LAYER_CONSTANTS = {

    // Default layers
    DEFAULT_LAYER: "social_index" as const,
    DEFAULT_TRANSPORT_LAYER: "transport" as const,
    DEFAULT_BIKE_INDEX_LAYER: "bike_index" as const,

    // Layer modes
    MODE_SINGLE: "Single" as const,
    MODE_PAIRED: "Paired" as const,

    // Default values
    DEFAULT_ALPHA: 0.5,
    DEFAULT_CITY_INDEX: 0,
    DEFAULT_TARGET_CITY_INDEX: 1,
    DEFAULT_OUTPUT_LAYER: "relative" as const,

    // View state defaults
    DEFAULT_PITCH: 0,
    DEFAULT_BEARING: 0,
    DEFAULT_TRANSITION_DURATION: 2000,

    // Layer ranges defaults
    DEFAULT_LAYER_RANGE: [0, 1] as [number, number],
    DEFAULT_LAYER_START_STOP: [0, 1] as [number, number]
} as const;

export const NUM_LAYERS_OPTIONS = ["Single", "Paired"] as const;

export const SORT_OPTIONS = {
    INCREASING: "increasing",
    DECREASING: "decreasing", 
    ALPHABETIC: "alphabetic"
} as const;

export const OUTPUT_LAYER_TYPES = {
    ORIGINAL: "original",
    TRANSFORMED: "transformed", 
    ABSOLUTE: "absolute",
    RELATIVE: "relative"
} as const;

export type NumLayersMode = "Single" | "Paired";
export type SortOption = "increasing" | "decreasing" | "alphabetic";
export type OutputLayerType = "original" | "transformed" | "absolute" | "relative";
