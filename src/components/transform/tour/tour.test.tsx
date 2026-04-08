import { describe, it, expect } from 'vitest'
import TransformTour from '@/components/transform/tour/tour'

describe('Transform Tour', () => {
  it('exports a Tour component', () => {
    expect(TransformTour).toBeDefined()
    expect(typeof TransformTour).toBe('object')
  })
})
