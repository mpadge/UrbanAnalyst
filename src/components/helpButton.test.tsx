import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HelpButton from '@/components/helpButton'

// Mock MUI components
vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick, size, variant }: any) => (
    <button 
      onClick={onClick} 
      data-size={size} 
      data-variant={variant}
      data-testid="help-button"
    >
      {children}
    </button>
  )
}))

vi.mock('@mui/material/Stack', () => ({
  default: ({ children, alignItems }: any) => (
    <div data-align-items={alignItems} data-testid="help-stack">
      {children}
    </div>
  )
}))

describe('HelpButton', () => {
  it('renders correctly', () => {
    const mockHandleTourOpen = vi.fn()
    render(<HelpButton handleTourOpen={mockHandleTourOpen} />)
    
    const button = screen.getByTestId('help-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Help')
    expect(button).toHaveAttribute('data-size', 'small')
    expect(button).toHaveAttribute('data-variant', 'outlined')
  })

  it('renders within a Stack component', () => {
    const mockHandleTourOpen = vi.fn()
    render(<HelpButton handleTourOpen={mockHandleTourOpen} />)
    
    const stack = screen.getByTestId('help-stack')
    expect(stack).toBeInTheDocument()
    expect(stack).toHaveAttribute('data-align-items', 'center')
  })

  it('calls handleTourOpen with true when clicked', () => {
    const mockHandleTourOpen = vi.fn()
    render(<HelpButton handleTourOpen={mockHandleTourOpen} />)
    
    const button = screen.getByTestId('help-button')
    fireEvent.click(button)
    
    expect(mockHandleTourOpen).toHaveBeenCalledTimes(1)
    expect(mockHandleTourOpen).toHaveBeenCalledWith(true)
  })

  it('displays correct button text', () => {
    const mockHandleTourOpen = vi.fn()
    render(<HelpButton handleTourOpen={mockHandleTourOpen} />)
    
    const button = screen.getByTestId('help-button')
    expect(button).toHaveTextContent('Help')
  })
})