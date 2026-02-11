import { describe, it, expect } from 'vitest'
import {
    LAYER_CONSTANTS,
    NUM_LAYERS_OPTIONS,
    SORT_OPTIONS,
    OUTPUT_LAYER_TYPES,
    type NumLayersMode,
    type SortOption,
    type OutputLayerType
} from '@/components/utils/pageConstants'

describe('LAYER_CONSTANTS', () => {
    it('has correct default layer values', () => {
        expect(LAYER_CONSTANTS.DEFAULT_LAYER).toBe('social_index')
        expect(LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER).toBe('transport')
        expect(LAYER_CONSTANTS.DEFAULT_BIKE_INDEX_LAYER).toBe('bike_index')
    })

    it('has correct layer modes', () => {
        expect(LAYER_CONSTANTS.MODE_SINGLE).toBe('Single')
        expect(LAYER_CONSTANTS.MODE_PAIRED).toBe('Paired')
    })

    it('has correct default values', () => {
        expect(LAYER_CONSTANTS.DEFAULT_ALPHA).toBe(0.5)
        expect(LAYER_CONSTANTS.DEFAULT_CITY_INDEX).toBe(0)
        expect(LAYER_CONSTANTS.DEFAULT_TARGET_CITY_INDEX).toBe(1)
        expect(LAYER_CONSTANTS.DEFAULT_OUTPUT_LAYER).toBe('relative')
    })

    it('has correct view state defaults', () => {
        expect(LAYER_CONSTANTS.DEFAULT_PITCH).toBe(0)
        expect(LAYER_CONSTANTS.DEFAULT_BEARING).toBe(0)
        expect(LAYER_CONSTANTS.DEFAULT_TRANSITION_DURATION).toBe(2000)
    })

    it('has correct layer ranges defaults', () => {
        expect(LAYER_CONSTANTS.DEFAULT_LAYER_RANGE).toEqual([0, 1])
        expect(LAYER_CONSTANTS.DEFAULT_LAYER_START_STOP).toEqual([0, 1])
    })
})

describe('NUM_LAYERS_OPTIONS', () => {
    it('has correct options', () => {
        expect(NUM_LAYERS_OPTIONS).toEqual(['Single', 'Paired'])
    })

    it('has correct length', () => {
        expect(NUM_LAYERS_OPTIONS).toHaveLength(2)
    })
})

describe('SORT_OPTIONS', () => {
    it('has correct options', () => {
        expect(SORT_OPTIONS.INCREASING).toBe('increasing')
        expect(SORT_OPTIONS.DECREASING).toBe('decreasing')
        expect(SORT_OPTIONS.ALPHABETIC).toBe('alphabetic')
    })
})

describe('OUTPUT_LAYER_TYPES', () => {
    it('has correct types', () => {
        expect(OUTPUT_LAYER_TYPES.ORIGINAL).toBe('original')
        expect(OUTPUT_LAYER_TYPES.TRANSFORMED).toBe('transformed')
        expect(OUTPUT_LAYER_TYPES.ABSOLUTE).toBe('absolute')
        expect(OUTPUT_LAYER_TYPES.RELATIVE).toBe('relative')
    })
})

describe('Type definitions', () => {
    it('NumLayersMode type is correct', () => {
        const singleMode: NumLayersMode = 'Single'
        const pairedMode: NumLayersMode = 'Paired'

        expect(singleMode).toBe('Single')
        expect(pairedMode).toBe('Paired')
    })

    it('SortOption type is correct', () => {
        const increasing: SortOption = 'increasing'
        const decreasing: SortOption = 'decreasing'
        const alphabetic: SortOption = 'alphabetic'

        expect(increasing).toBe('increasing')
        expect(decreasing).toBe('decreasing')
        expect(alphabetic).toBe('alphabetic')
    })

    it('OutputLayerType type is correct', () => {
        const original: OutputLayerType = 'original'
        const transformed: OutputLayerType = 'transformed'
        const absolute: OutputLayerType = 'absolute'
        const relative: OutputLayerType = 'relative'

        expect(original).toBe('original')
        expect(transformed).toBe('transformed')
        expect(absolute).toBe('absolute')
        expect(relative).toBe('relative')
    })
})
