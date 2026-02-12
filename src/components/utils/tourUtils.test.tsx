import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTourLogic } from '@/components/utils/tourUtils'

vi.mock('@/components/windowSize', () => ({
    default: vi.fn(() => ({ width: 1024, height: 768 }))
}))

vi.mock('@/components/tourClass', () => ({
    default: vi.fn(() => 'tourhelperLight')
}))

vi.mock('@/components/compare/tour/tourConfig', () => ({
    getTourConfig: vi.fn((_width: number, _height: number) => [
        { selector: '[data-tour="step1"]', content: 'Step 1' },
        { selector: '[data-tour="step2"]', content: 'Step 2' }
    ])
}))

vi.mock('./localStorageUtils', () => ({
    sessionStorageHelpers: {
        getItem: vi.fn((key) => {
            if (key === 'uacomparetour') return null
            return null
        }),
        setItem: vi.fn()
    }
}))

describe('useTourLogic', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('returns tourProps with correct structure', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(result.current.tourProps).toHaveProperty('isOpen')
        expect(result.current.tourProps).toHaveProperty('steps')
        expect(result.current.tourProps).toHaveProperty('onRequestClose')
        expect(result.current.tourProps).toHaveProperty('disableInteraction')
        expect(result.current.tourProps).toHaveProperty('maskClassName')
        expect(result.current.tourProps).toHaveProperty('className')
        expect(result.current.tourProps).toHaveProperty('rounded')
        expect(result.current.tourProps).toHaveProperty('accentColor')
    })

    it('returns handleTourOpen function', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(typeof result.current.handleTourOpen).toBe('function')
    })

    it('tour opens automatically when sessionStorage does not have tour completed', async () => {
        const { result } = renderHook(() => useTourLogic())

        await waitFor(() => {
            expect(result.current.tourProps.isOpen).toBe(true)
        })
    })

    it('accentColor is set correctly', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(result.current.tourProps.accentColor).toBe('#5cb7b7')
    })

    it('rounded property is set to 5', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(result.current.tourProps.rounded).toBe(5)
    })

    it('disableInteraction is set to false', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(result.current.tourProps.disableInteraction).toBe(false)
    })

    it('onRequestClose is a function', () => {
        const { result } = renderHook(() => useTourLogic())

        expect(typeof result.current.tourProps.onRequestClose).toBe('function')
    })
})
