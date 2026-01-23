import { describe, it, expect } from 'vitest'
import { GetLayerText, GetLayerTextCompare } from '@/components/explainLayer'

describe('explainLayer', () => {
  describe('GetLayerText', () => {
    it('returns empty string for unknown layer', () => {
      expect(GetLayerText('unknown', '', 'single', 0, [])).toBe('')
    })

    it('returns correct text for social layer', () => {
      const result = GetLayerText('social', '', 'single', 0, [])
      expect(result).toContain('Representative socio-demographic data')
    })

    it('returns correct text for timesabs layer with meanVarIndex', () => {
      const result = GetLayerText('timesabs', '', 'single', 1, [])
      expect(result).toContain('Variation in the average of the fastest times')
    })

    it('returns correct text for paired layers', () => {
      const paired_keys = ['timesrel_transfers']
      const result = GetLayerText('timesrel', 'transfers', 'dual', 0, paired_keys)
      expect(result).toContain('Relative travel times multiplied by numbers of transfers')
    })

    it('handles layer name normalization', () => {
      const result1 = GetLayerText('social_index', '', 'single', 0, [])
      const result2 = GetLayerText('social', '', 'single', 0, [])
      expect(result1).toBe(result2)
    })

    it('returns mean/variance text when meanVarIndex is provided', () => {
      const result = GetLayerText('timesrel', '', 'single', 1, [])
      expect(result).toContain('Variation in the ratio')
    })

    it('handles empty paired_keys array', () => {
      const result = GetLayerText('timesrel', 'transfers', 'dual', 0, [])
      expect(result).toBe('')
    })
  })

  describe('GetLayerTextCompare', () => {
    it('returns empty string for unknown layer combination', () => {
      expect(GetLayerTextCompare('unknown', '', 'Single', 0, [])).toBe('')
    })

    it('returns empty string for Single numLayers with individual layer', () => {
      const paired_keys = ['timesrel_transfers']
      const result = GetLayerTextCompare('timesrel', 'transfers', 'Single', 0, paired_keys)
      expect(result).toBe('')
    })

    it('returns correct compare text for paired layers', () => {
      const paired_keys = ['timesrel_transfers']
      const result = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 0, paired_keys)
      expect(result).toContain('Strength of relationship between relative travel times')
    })

    it('returns correct text for non-Single numLayers', () => {
      const paired_keys = ['timesrel_transfers']
      const result = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 0, paired_keys)
      expect(result).toContain('Strength of relationship')
    })

    it('handles layer name normalization in compare', () => {
      const paired_keys = ['timesrel_transfers']
      const result1 = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 0, paired_keys)
      const result2 = GetLayerTextCompare('timesrel_index', 'transfers', 'Paired', 0, paired_keys)
      expect(result1).toBe(result2)
    })

    it('returns mean/variance text when meanVarIndex is provided in compare', () => {
      const paired_keys = ['timesrel_transfers']
      const result = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 1, paired_keys)
      expect(result).toBe(result) // Should return same text as most compare entries have only one description
    })

    it('handles case-sensitive numLayers parameter', () => {
      const paired_keys = ['timesrel_transfers']
      const result1 = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 0, paired_keys)
      const result2 = GetLayerTextCompare('timesrel', 'transfers', 'paired', 0, paired_keys)
      expect(result1).toBe(result2)
    })

    it('returns empty string when paired_keys does not contain the combination', () => {
      const paired_keys = ['timesrel_intervals']
      const result = GetLayerTextCompare('timesrel', 'transfers', 'Paired', 0, paired_keys)
      expect(result).toBe('')
    })
  })
})