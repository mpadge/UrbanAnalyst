import { describe, it, expect } from 'vitest'
import { calculateLayerRanges } from '@/components/utils/layerUtils'
import { DataRangeKeys, Data2RangeKeys, CityDataProps } from '@/data/interfaces'

describe('calculateLayerRanges', () => {
    const mockCitiesArray: CityDataProps[] = [
        {
            city: 'City1',
            dataRanges: {
                social_index: [0, 0.2, 0.8, 1],
                transport: [0, 0.1, 0.9, 1],
                bike_index: [0, 0.3, 0.7, 1]
            } as Record<DataRangeKeys, [number, number, number, number]>,
            dataRangesPaired: {
                transport_bike: [0, 0.15, 0.85, 1]
            } as Record<Data2RangeKeys, [number, number, number, number]>
        }
    ]

    it('returns correct values for single layer mode', () => {
        const result = calculateLayerRanges(
            0,
            'social_index',
            '',
            'Single',
            mockCitiesArray
        )

        expect(result.this_layer).toBe('social_index')
        expect(result.layer_start).toBe(0)
        expect(result.layer_min).toBe(0.2)
        expect(result.layer_max).toBe(0.8)
        expect(result.layer_stop).toBe(1)
        expect(result.dual_layers).toBe(false)
    })

    it('returns correct values for paired layer mode with dual layers', () => {
        const result = calculateLayerRanges(
            0,
            'transport',
            'bike_index',
            'Paired',
            mockCitiesArray
        )

        expect(result.this_layer).toBe('transport_bike')
        expect(result.layer_start).toBe(0)
        expect(result.layer_min).toBe(0.15)
        expect(result.layer_max).toBe(0.85)
        expect(result.layer_stop).toBe(1)
        expect(result.dual_layers).toBe(true)
        expect(result.these_layers).toBe('transport_bike')
    })

    it('handles layer name replacement correctly', () => {
        const result = calculateLayerRanges(
            0,
            'social_index',
            '',
            'Single',
            mockCitiesArray
        )

        expect(result.this_layer).toBe('social_index')
    })

    it('returns fallback for paired mode when no paired keys exist', () => {
        const mockCitiesArrayNoPaired: CityDataProps[] = [
            {
                city: 'City1',
                dataRanges: {
                    social_index: [0, 0.2, 0.8, 1]
                } as Record<DataRangeKeys, [number, number, number, number]>,
                dataRangesPaired: {} as Record<Data2RangeKeys, [number, number, number, number]>
            }
        ]

        const result = calculateLayerRanges(
            0,
            'social_index',
            '',
            'Paired',
            mockCitiesArrayNoPaired
        )

        expect(result.dual_layers).toBe(false)
        expect(result.this_layer).toBe('social_index')
    })

    it('handles different layer order in paired keys', () => {
        const mockCitiesArrayReversed: CityDataProps[] = [
            {
                city: 'City1',
                dataRanges: {
                    transport: [0, 0.1, 0.9, 1]
                } as Record<DataRangeKeys, [number, number, number, number]>,
                dataRangesPaired: {
                    bike_transport: [0, 0.15, 0.85, 1]
                } as Record<Data2RangeKeys, [number, number, number, number]>
            }
        ]

        const result = calculateLayerRanges(
            0,
            'transport',
            'bike_index',
            'Paired',
            mockCitiesArrayReversed
        )

        expect(result.these_layers).toBe('bike_transport')
        expect(result.dual_layers).toBe(true)
    })

    it('handles layer name replacement correctly', () => {
        const result = calculateLayerRanges(
            0,
            'social_index',
            '',
            'Single',
            mockCitiesArray
        )

        expect(result.this_layer).toBe('social_index')
    })
})
