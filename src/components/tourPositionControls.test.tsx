import { describe, it, expect } from 'vitest'
import { posControlsX, posControlsY, maxWidth } from '@/components/tourPositionControls'

describe('tourPositionControls', () => {
  describe('posControlsX', () => {
    it('returns correct position for large screen with controls', () => {
      const result = posControlsX(1200, 'controls')
      expect(result).toBe('-180px')
    })

    it('returns correct position for large screen with nav', () => {
      const result = posControlsX(1200, 'nav')
      expect(result).toBe('340px')
    })

    it('returns correct position for large screen with other', () => {
      const result = posControlsX(1200, 'other')
      expect(result).toBe('400px')
    })

    it('returns correct position for medium screen with controls', () => {
      const result = posControlsX(800, 'controls')
      expect(result).toBe('-40px')
    })

    it('returns correct position for medium screen with nav', () => {
      const result = posControlsX(800, 'nav')
      expect(result).toBe('170px')
    })

    it('returns correct position for medium screen with other', () => {
      const result = posControlsX(800, 'other')
      expect(result).toBe('210px')
    })

    it('returns 0px for narrow screen', () => {
      const result = posControlsX(600, 'controls')
      expect(result).toBe('-0px')
    })

    it('handles legend near parameter', () => {
      const result = posControlsX(1200, 'legend')
      expect(result).toBe('-400px')
    })

    it('uses default near parameter as controls', () => {
      const result = posControlsX(1200)
      expect(result).toBe('-180px')
    })

    it('rounds the result', () => {
      const result = posControlsX(1150, 'controls')
      expect(result).toMatch(/^-?\d+px$/)
    })
  })

  describe('posControlsY', () => {
    it('returns correct position for large screen with controls', () => {
      const result = posControlsY(1200, 800, 'controls')
      expect(result).toBe('-145px')
    })

    it('returns correct position for large screen with nav', () => {
      const result = posControlsY(1200, 800, 'nav')
      expect(result).toBe('-200px')
    })

    it('returns correct position for large screen with other', () => {
      const result = posControlsY(1200, 800, 'other')
      expect(result).toBe('178px')
    })

    it('returns correct position for medium screen with controls', () => {
      const result = posControlsY(800, 600, 'controls')
      expect(result).toBe('-60px')
    })

    it('returns correct position for medium screen with nav', () => {
      const result = posControlsY(800, 600, 'nav')
      expect(result).toBe('-120px')
    })

    it('returns correct position for medium screen with other', () => {
      const result = posControlsY(800, 600, 'other')
      expect(result).toBe('133px')
    })

    it('returns 0px for narrow screen', () => {
      const result = posControlsY(600, 400, 'controls')
      expect(result).toBe('-0px')
    })

    it('uses default near parameter as controls', () => {
      const result = posControlsY(1200, 800)
      expect(result).toBe('-145px')
    })

    it('rounds the result', () => {
      const result = posControlsY(1200, 801, 'controls')
      expect(result).toBe('-146px')
    })
  })

  describe('maxWidth', () => {
    it('returns large big width for large screen with wide=true', () => {
      const result = maxWidth(1200, true)
      expect(result).toBe(600)
    })

    it('returns large small width for large screen with wide=false', () => {
      const result = maxWidth(1200, false)
      expect(result).toBe(400)
    })

    it('returns medium big width for medium screen with wide=true', () => {
      const result = maxWidth(800, true)
      expect(result).toBe(400)
    })

    it('returns medium small width for medium screen with wide=false', () => {
      const result = maxWidth(800, false)
      expect(result).toBe(300)
    })

    it('returns narrow big width for narrow screen with wide=true', () => {
      const result = maxWidth(600, true)
      expect(result).toBe(300)
    })

    it('returns narrow small width for narrow screen with wide=false', () => {
      const result = maxWidth(600, false)
      expect(result).toBe(250)
    })

    it('uses default wide parameter as false', () => {
      const result = maxWidth(1200)
      expect(result).toBe(400)
    })

    it('handles boundary conditions correctly', () => {
      expect(maxWidth(1120, false)).toBe(300)
      expect(maxWidth(700, false)).toBe(250)
      expect(maxWidth(1121, false)).toBe(400)
      expect(maxWidth(701, false)).toBe(300)
      expect(maxWidth(1119, false)).toBe(300)
      expect(maxWidth(699, false)).toBe(250)
    })
  })
})