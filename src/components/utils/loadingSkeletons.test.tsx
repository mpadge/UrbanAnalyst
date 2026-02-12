import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
    ChartSkeleton,
    ControlSkeleton,
    MapSkeleton,
    MapControlSkeleton,
    MapLegendSkeleton,
    TransformSkeleton,
    TransformControlSkeleton,
    TransformLegendSkeleton
} from '@/components/utils/loadingSkeletons'

describe('Loading Skeletons', () => {
    describe('ChartSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<ChartSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<ChartSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('ControlSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<ControlSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<ControlSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('MapSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<MapSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<MapSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('MapControlSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<MapControlSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<MapControlSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('MapLegendSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<MapLegendSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<MapLegendSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('TransformSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<TransformSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<TransformSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('TransformControlSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<TransformControlSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<TransformControlSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('TransformLegendSkeleton', () => {
        it('renders without errors', () => {
            expect(() => render(<TransformLegendSkeleton />)).not.toThrow()
        })

        it('contains skeleton element', () => {
            const { container } = render(<TransformLegendSkeleton />)
            const skeleton = container.querySelector('[class*="MuiSkeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })
})
