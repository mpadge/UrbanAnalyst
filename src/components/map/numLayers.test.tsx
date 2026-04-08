import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectNumLayers from '@/components/map/numLayers'

vi.mock('@mui/material/ToggleButton', () => ({
  default: ({ children, value }: any): JSX.Element => (
    <button data-value={value}>{children}</button>
  )
}))

vi.mock('@mui/material/ToggleButtonGroup', () => ({
  default: ({ children, value, exclusive }: any): JSX.Element => (
    <div data-value={value} data-exclusive={exclusive}>{children}</div>
  )
}))

describe('SelectNumLayers', () => {
  it('renders single and paired options', () => {
    render(
      <SelectNumLayers
        numLayers="Single"
        numLayersOptions={["Single", "Paired"]}
        handleNumLayersChange={() => {}}
      />
    )
    
    expect(screen.getByText('Single')).toBeInTheDocument()
    expect(screen.getByText('Paired')).toBeInTheDocument()
  })

  it('renders toggle group with exclusive setting', () => {
    const { container } = render(
      <SelectNumLayers
        numLayers="Single"
        numLayersOptions={["Single", "Paired"]}
        handleNumLayersChange={() => {}}
      />
    )
    
    const group = container.firstChild as HTMLElement
    expect(group.getAttribute('data-exclusive')).toBe('true')
  })
})
