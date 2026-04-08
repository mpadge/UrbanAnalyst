import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/transform/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

vi.mock('@/components/transform/transformPage', () => ({
  default: (): JSX.Element => <div data-testid="transform-page" />
}))

describe('Transform Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('home,summarise,compare,map,about')
  })

  it('renders the TransformPage component', () => {
    render(<Home />)
    
    expect(screen.getByTestId('transform-page')).toBeInTheDocument()
  })
})
