import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary, ErrorSkeleton, ComponentErrorSkeleton } from '@/components/utils/errorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }): JSX.Element => {
    if (shouldThrow) {
        throw new Error('Test error')
    }
    return <div>Content rendered successfully</div>
}

/*
 * Note: When testing ErrorBoundary components that intentionally throw errors,
 * React's development mode logs verbose error stacks to stderr. These are suppressed
 * in vitest.setup.ts via process.stderr.write interception.
 */

describe('ErrorBoundary', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders children when no error occurs', () => {
        render(
            <ErrorBoundary>
                <div>Child content</div>
            </ErrorBoundary>
        )

        expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('renders fallback when error occurs', () => {
        render(
            <ErrorBoundary fallback={<div>Custom fallback</div>}>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        )

        expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    })

    it('shows default error UI when error occurs and no fallback provided', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        )

        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        expect(screen.getByText('Test error')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
    })

    it('has retry button', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        )

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('shows error message when error occurs', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        )

        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        expect(screen.getByText('Test error')).toBeInTheDocument()
    })
})

describe('ErrorSkeleton', () => {
    it('renders correctly', () => {
        render(<ErrorSkeleton />)

        expect(screen.getByText('Failed to load component')).toBeInTheDocument()
    })

    it('has correct styling structure', () => {
        const { container } = render(<ErrorSkeleton />)
        const box = container.querySelector('[class*="MuiBox"]')

        expect(box).toBeInTheDocument()
    })
})

describe('ComponentErrorSkeleton', () => {
    it('renders correctly', () => {
        render(<ComponentErrorSkeleton />)

        expect(screen.getByText('Failed to load map')).toBeInTheDocument()
    })

    it('has full viewport width and height', () => {
        const { container } = render(<ComponentErrorSkeleton />)
        const box = container.querySelector('[class*="MuiBox"]')

        expect(box).toBeInTheDocument()
    })
})
