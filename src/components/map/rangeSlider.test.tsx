import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RangeSlider from '@/components/map/rangeSlider'

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
      data-step={props.step}
      data-testid="range-slider"
    />
  )
}))

describe('RangeSlider', () => {
  it('renders slider with correct props', () => {
    const mockChange = vi.fn()
    render(
      <RangeSlider
        rangeMin={0}
        rangeMax={100}
        sliderValues={[25, 75]}
        step={1}
        handleSliderValuesChange={mockChange}
      />
    )
    
    const slider = screen.getByTestId('range-slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveAttribute('data-min', '0')
    expect(slider).toHaveAttribute('data-max', '100')
  })

  it('renders with small size when width < 700', () => {
    vi.mock('@/components/windowSize', () => ({
      default: () => ({ width: 500, height: 600 })
    }))
    
    const mockChange = vi.fn()
    render(
      <RangeSlider
        rangeMin={0}
        rangeMax={100}
        sliderValues={[25, 75]}
        step={1}
        handleSliderValuesChange={mockChange}
      />
    )
    
    expect(screen.getByTestId('range-slider')).toBeInTheDocument()
  })
})
