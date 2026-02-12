import { describe, it, expect } from 'vitest'
import { HeadingTextOneLayer, getIdxWashington } from '@/components/headingText'

describe('headingText', () => {
  describe('HeadingTextOneLayer', () => {
    it('returns empty string for empty layer', () => {
      expect(HeadingTextOneLayer('')).toBe('')
    })

    it('returns empty string for undefined', () => {
      expect(HeadingTextOneLayer(undefined as unknown as string)).toBe('')
    })

    it('returns Social Index for social layers', () => {
      expect(HeadingTextOneLayer('social')).toBe('Social Index')
      expect(HeadingTextOneLayer('social_index')).toBe('Social Index')
    })

    it('returns Transport Relative for timesrel', () => {
      expect(HeadingTextOneLayer('timesrel')).toBe('Transport Relative')
    })

    it('returns Transport Absolute for timesabs', () => {
      expect(HeadingTextOneLayer('timesabs')).toBe('Transport Absolute')
    })

    it('returns Num. Transfers for transfers', () => {
      expect(HeadingTextOneLayer('transfers')).toBe('Num. Transfers')
    })

    it('returns Transport Interval for intervals', () => {
      expect(HeadingTextOneLayer('intervals')).toBe('Transport Interval')
    })

    it('returns Transport Combined for transport', () => {
      expect(HeadingTextOneLayer('transport')).toBe('Transport Combined')
    })

    it('returns Population Density for popdens', () => {
      expect(HeadingTextOneLayer('popdens')).toBe('Population Density')
    })

    it('returns School Distance for schooldist', () => {
      expect(HeadingTextOneLayer('schooldist')).toBe('School Distance')
    })

    it('returns Bicycle Index for bike layers', () => {
      expect(HeadingTextOneLayer('bike')).toBe('Bicycle Index')
      expect(HeadingTextOneLayer('bike_index')).toBe('Bicycle Index')
    })

    it('returns Nature Index for natural', () => {
      expect(HeadingTextOneLayer('natural')).toBe('Nature Index')
    })

    it('returns Parking for parking', () => {
      expect(HeadingTextOneLayer('parking')).toBe('Parking')
    })

    it('returns Housing Value for value', () => {
      expect(HeadingTextOneLayer('value')).toBe('Housing Value')
    })

    it('returns Housing Rent for rent', () => {
      expect(HeadingTextOneLayer('rent')).toBe('Housing Rent')
    })
  })

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
  })
})
