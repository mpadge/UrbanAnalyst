import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OpacitySlider from '@/components/map/opacitySlider'

vi.mock('@/components/windowSize', () => ({
  default: () => ({ width: 800, height: 600 })
}))

vi.mock('@mui/material/Box', () => ({
  default: ({ children, className }: any): JSX.Element => (
    <div className={className}>{children}</div>
  )
}))

vi.mock('@mui/material/Slider', () => ({
  default: (props: any): JSX.Element => (
    <input 
      type="range" 
      data-min={props.min}
      data-max={props.max}
      data-value={props.value}
      data-testid="opacity-slider"
    />
  )
}))

describe('OpacitySlider', () => {
  it('renders slider with correct props', () => {
    const mockChange = vi.fn()
    render(
      <OpacitySlider
        alpha={0.5}
        handleAlphaChange={mockChange}
      />
    )
    
    const slider = screen.getByTestId('opacity-slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveAttribute('data-min', '0')
    expect(slider).toHaveAttribute('data-max', '1')
  })

  it('renders with provided alpha value', () => {
    const mockChange = vi.fn()
    render(
      <OpacitySlider
        alpha={0.8}
        handleAlphaChange={mockChange}
      />
    )
    
    const slider = screen.getByTestId('opacity-slider')
    expect(slider).toHaveAttribute('data-value', '0.8')
  })
})
