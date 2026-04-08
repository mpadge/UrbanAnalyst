import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/map/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

vi.mock('@/components/map/mapPage', () => ({
  default: (): JSX.Element => <div data-testid="map-page" />
}))

describe('Map Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('home,summarise,compare,transform,about')
  })

  it('renders the MapPage component', () => {
    render(<Home />)
    
    expect(screen.getByTestId('map-page')).toBeInTheDocument()
  })
})
