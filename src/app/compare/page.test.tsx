import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/compare/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

vi.mock('@/components/compare/comparePage', () => ({
  default: (): JSX.Element => <div data-testid="compare-page" />
}))

describe('Compare Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('home,summarise,map,transform,about')
  })

  it('renders the ComparePage component', () => {
    render(<Home />)
    
    expect(screen.getByTestId('compare-page')).toBeInTheDocument()
  })
})
