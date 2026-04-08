import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ResetButton from '@/components/transform/resetButton'

vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick, variant }: any): JSX.Element => (
    <button onClick={onClick} data-variant={variant}>{children}</button>
  )
}))

vi.mock('@mui/material/Stack', () => ({
  default: ({ children, alignItems }: any): JSX.Element => (
    <div data-align-items={alignItems}>{children}</div>
  )
}))

describe('ResetButton', () => {
  it('renders reset button with correct text', () => {
    const mockHandleReset = vi.fn()
    render(<ResetButton handleReset={mockHandleReset} />)
    
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('calls handleReset when clicked', () => {
    const mockHandleReset = vi.fn()
    render(<ResetButton handleReset={mockHandleReset} />)
    
    fireEvent.click(screen.getByText('Reset'))
    expect(mockHandleReset).toHaveBeenCalledTimes(1)
  })

  it('renders with outlined variant', () => {
    const mockHandleReset = vi.fn()
    render(<ResetButton handleReset={mockHandleReset} />)
    
    const button = screen.getByText('Reset')
    expect(button).toHaveAttribute('data-variant', 'outlined')
  })
})
