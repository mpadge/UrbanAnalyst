import { describe, it, expect } from 'vitest'
import Tour from '@/components/tour/tour'

describe('Tour', () => {
    it('exports a Tour component', () => {
        expect(Tour).toBeDefined()
        expect(typeof Tour).toBe('object')
    })
})
