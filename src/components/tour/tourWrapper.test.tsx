import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import UATour from '@/components/tour/tourWrapper'

const steps = [
    { content: <div>First step</div>, style: { maxWidth: 300 } },
    { content: ({ goTo }: { goTo: (i: number) => void }) => (
        <div>Second step<button onClick={() => goTo(0)}>Back to start</button></div>
    ) },
]

describe('UATour', () => {
    it('renders the first step with its custom style', () => {
        render(<UATour isOpen steps={steps} onRequestClose={vi.fn()} />)
        const popover = screen.getByText('First step').closest('.reactour__popover') as HTMLElement
        expect(popover).not.toBeNull()
        expect(popover.style.maxWidth).toBe('300px')
    })

    it('calls onRequestClose when closed with Escape', () => {
        const onRequestClose = vi.fn()
        render(<UATour isOpen steps={steps} onRequestClose={onRequestClose} />)
        expect(onRequestClose).not.toHaveBeenCalled()
        fireEvent.keyDown(window, { key: 'Escape', keyCode: 27 })
        expect(onRequestClose).toHaveBeenCalled()
    })

    it('provides goTo to function content', () => {
        render(<UATour isOpen steps={steps} onRequestClose={vi.fn()} />)
        fireEvent.keyDown(window, { key: 'ArrowRight', keyCode: 39 })
        fireEvent.click(screen.getByText('Back to start'))
        expect(screen.getByText('First step')).toBeDefined()
    })
})
