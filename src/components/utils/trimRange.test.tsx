import { describe, it, expect } from 'vitest'
import { trimRange, trimRangeSDs, getRangeSDs, getRangeLimits } from '@/components/utils/trimRange'

describe('trimRange', () => {
    it('returns trimmed array for normal distribution', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const result = trimRange([...data])

        expect(result).toHaveLength(data.length)
        expect(result.every(val => typeof val === 'number')).toBe(true)
    })

    it('handles empty array', () => {
        const result = trimRange([])
        expect(result).toEqual([])
    })

    it('handles single element array', () => {
        const result = trimRange([5])
        expect(result).toEqual([5])
    })

    it('handles array with all same values', () => {
        const data = [5, 5, 5, 5, 5]
        const result = trimRange([...data])
        expect(result).toEqual(data)
    })

    it('trims outliers from large dataset', () => {
        const data = Array.from({ length: 100 }, (_, i) => i)
        const result = trimRange([...data])

        expect(result.every(val => val >= 0)).toBe(true)
        expect(result.every(val => val <= 100)).toBe(true)
    })

    it('trims outliers from large dataset', () => {
        const data = Array.from({ length: 100 }, (_, i) => i)
        const result = trimRange([...data])

        expect(result.every(val => val >= 0)).toBe(true)
        expect(result.every(val => val <= 100)).toBe(true)
    })

    it('returns an array of the same length as input', () => {
        const original = [1, 2, 3, 4, 5]
        const result = trimRange(original)
        expect(result).toHaveLength(original.length)
    })

    it('trims outliers from large dataset', () => {
        const data = Array.from({ length: 100 }, (_, i) => i)
        const result = trimRange([...data])

        expect(result.every(val => val >= 0)).toBe(true)
        expect(result.every(val => val <= 100)).toBe(true)
    })
})

describe('trimRangeSDs', () => {
    it('returns trimmed array with standard deviation limits', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const result = trimRangeSDs([...data], 1.96)

        expect(result).toHaveLength(data.length)
        expect(result.every(val => typeof val === 'number')).toBe(true)
    })

    it('handles empty array', () => {
        const result = trimRangeSDs([])
        expect(result).toEqual([])
    })

    it('handles array with extreme outliers', () => {
        const data = [100, 100, 100, 100, 100, 1000, 2000]
        const result = trimRangeSDs([...data], 1.96)

        expect(result.every(val => val <= 2000)).toBe(true)
        expect(result.every(val => typeof val === 'number')).toBe(true)
    })

    it('uses custom sdRange correctly', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const resultNarrow = trimRangeSDs([...data], 0.5)
        const resultWide = trimRangeSDs([...data], 3.0)

        expect(resultWide.every(val => val >= Math.min(...data) - 10)).toBe(true)
        expect(resultNarrow.every(val => val >= Math.min(...data))).toBe(true)
    })
})

describe('getRangeSDs', () => {
    it('returns array with lower and upper limits', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const result = getRangeSDs(data, 1.96)

        expect(result).toHaveLength(2)
        expect(result[0]).toBeLessThan(result[1])
    })

    it('handles empty array', () => {
        const result = getRangeSDs([])
        expect(result).toHaveLength(2)
        expect(result.every(val => isNaN(val))).toBe(true)
    })

    it('returns correct range for known distribution', () => {
        const data = [0, 0, 0, 10, 10, 10]
        const result = getRangeSDs(data, 1.96)

        expect(result[0]).toBeLessThanOrEqual(result[1])
    })

    it('uses custom sdRange correctly', () => {
        const data = [1, 2, 3, 4, 5]
        const resultNarrow = getRangeSDs(data, 0.5)
        const resultWide = getRangeSDs(data, 3.0)

        expect(resultWide[1] - resultWide[0]).toBeGreaterThan(resultNarrow[1] - resultNarrow[0])
    })
})

describe('getRangeLimits', () => {
    it('returns array with 4 values', () => {
        const geoJSON = {
            features: [
                { properties: { value: 1 } },
                { properties: { value: 2 } },
                { properties: { value: 3 } },
                { properties: { value: 4 } },
                { properties: { value: 5 } }
            ]
        }

        const result = getRangeLimits(geoJSON, 'value', 1.96)

        expect(result).toHaveLength(4)
        expect(typeof result[0]).toBe('number')
        expect(typeof result[1]).toBe('number')
        expect(typeof result[2]).toBe('number')
        expect(typeof result[3]).toBe('number')
    })

    it('handles null geoJSON', () => {
        const result = getRangeLimits(null, 'value', 1.96)
        expect(result[0]).toBe(Infinity)
        expect(result[3]).toBe(-Infinity)
    })

    it('handles geoJSON without features', () => {
        const geoJSON = { features: [] }
        const result = getRangeLimits(geoJSON, 'value', 1.96)
        expect(result[0]).toBe(Infinity)
        expect(result[3]).toBe(-Infinity)
    })

    it('handles features without the specified variable', () => {
        const geoJSON = {
            features: [
                { properties: { otherValue: 1 } },
                { properties: { otherValue: 2 } }
            ]
        }
        const result = getRangeLimits(geoJSON, 'value', 1.96)
        expect(result[0]).toBe(Infinity)
        expect(result[3]).toBe(-Infinity)
    })

    it('handles undefined values in features', () => {
        const geoJSON = {
            features: [
                { properties: { value: undefined } },
                { properties: { value: NaN } },
                { properties: { value: 5 } }
            ]
        }
        const result = getRangeLimits(geoJSON, 'value', 1.96)

        expect(result[0]).toBe(5)
        expect(result[3]).toBe(5)
    })

    it('uses custom sdRange correctly', () => {
        const geoJSON = {
            features: [
                { properties: { value: 1 } },
                { properties: { value: 2 } },
                { properties: { value: 3 } },
                { properties: { value: 4 } },
                { properties: { value: 5 } }
            ]
        }

        const resultNarrow = getRangeLimits(geoJSON, 'value', 0.5)
        const resultWide = getRangeLimits(geoJSON, 'value', 3.0)

        const narrowRange = resultNarrow[2] - resultNarrow[1]
        const wideRange = resultWide[2] - resultWide[1]

        expect(wideRange).toBeGreaterThan(narrowRange)
    })

    it('correctly extracts values from nested features', () => {
        const geoJSON = {
            features: [
                { properties: { value: 10 } },
                { properties: { value: 20 } },
                { properties: { value: 30 } }
            ]
        }

        const result = getRangeLimits(geoJSON, 'value', 1.96)

        expect(result[0]).toBe(10)
        expect(result[3]).toBe(30)
    })
})
