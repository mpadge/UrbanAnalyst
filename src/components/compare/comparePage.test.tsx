import { describe, it, expect } from 'vitest'
import { getIdxWashington } from '@/components/headingText'

describe('comparePage helper functions', () => {
  describe('getIdxWashington', () => {
    it('returns -1 for empty array', () => {
      expect(getIdxWashington([])).toBe(-1)
    })

    it('returns correct index when washington exists', () => {
      const cities = [
        { name: 'london', data: {}, dataRangesPaired: {} },
        { name: 'washington', data: {}, dataRangesPaired: {} },
        { name: 'paris', data: {}, dataRangesPaired: {} },
      ] as unknown as Parameters<typeof getIdxWashington>[0]
      expect(getIdxWashington(cities)).toBe(1)
    })

    it('returns -1 when washington does not exist', () => {
      const cities = [
        { name: 'london', data: {}, dataRangesPaired: {} },
        { name: 'paris', data: {}, dataRangesPaired: {} },
      ] as unknown as Parameters<typeof getIdxWashington>[0]
      expect(getIdxWashington(cities)).toBe(-1)
    })

    it('returns -1 when washington is first', () => {
      const cities = [
        { name: 'washington', data: {}, dataRangesPaired: {} },
        { name: 'london', data: {}, dataRangesPaired: {} },
      ] as unknown as Parameters<typeof getIdxWashington>[0]
      expect(getIdxWashington(cities)).toBe(0)
    })
  })
})
