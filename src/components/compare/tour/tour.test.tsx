import { describe, it, expect } from 'vitest'
import CompareTour from '@/components/compare/tour/tour'

describe('Compare Tour', () => {
  it('exports a Tour component', () => {
    expect(CompareTour).toBeDefined()
    expect(typeof CompareTour).toBe('object')
  })
})
