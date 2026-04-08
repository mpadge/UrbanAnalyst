import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/about/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

describe('About Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('home,summarise,compare,map,transform')
  })

  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getByText('Urban Analyst')).toBeInTheDocument()
  })

  it('renders What is this section', () => {
    render(<Home />)
    
    expect(screen.getByText(/What is this?/i)).toBeInTheDocument()
  })

  it('renders links to all main pages', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /Summarise/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Compare/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Map/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Transform/i })).toBeInTheDocument()
  })

  it('renders Who made this section', () => {
    render(<Home />)
    
    expect(screen.getByText(/Who made this?/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /Mark Padgham/i })).toHaveAttribute('href', 'https://github.com/mpadge')
  })

  it('renders Who funds this section', () => {
    render(<Home />)
    
    expect(screen.getByText(/Who funds this?/i)).toBeInTheDocument()
  })

  it('renders prototypefund link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /prototypefund/i })).toHaveAttribute('href', 'https://prototypefund.de')
  })

  it('renders Want to know more section with email', () => {
    render(<Home />)
    
    expect(screen.getByText(/Want to know more?/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /info@urbananalyst.city/i })).toHaveAttribute('href', 'mailto:info@urbananalyst.city')
  })

  it('renders documentation link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /documentation/i })).toHaveAttribute('href', 'https://docs.urbananalyst.city')
  })
})
