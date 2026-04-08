import { describe, it, expect } from 'vitest'
import MapTour from '@/components/map/tour/tour'

describe('Map Tour', () => {
  it('exports a Tour component', () => {
    expect(MapTour).toBeDefined()
    expect(typeof MapTour).toBe('object')
  })
})
