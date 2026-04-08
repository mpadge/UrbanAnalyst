import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: unknown; alt: string; [key: string]: unknown }) => {
    const { fill: _fill, priority: _priority, ...rest } = props
    return <img src={typeof src === 'object' ? (src as { src: string }).src : src as string} alt={alt} {...rest} />
  }
}))

vi.mock('@/components/main/uaindexBarChart', () => ({
  default: (): JSX.Element => <div data-testid="ua-bar-chart" />
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('summarise,compare,map,transform,about')
  })

  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getByText('Urban Analyst')).toBeInTheDocument()
  })

  it('renders the UA index chart', () => {
    render(<Home />)
    
    expect(screen.getByTestId('ua-bar-chart')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Home />)
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders card links for main pages', () => {
    render(<Home />)
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders contact email link', () => {
    render(<Home />)
    
    const emailLinks = screen.getAllByRole('link', { name: /info@urbananalyst.city/i })
    expect(emailLinks[0]).toHaveAttribute('href', 'mailto:info@urbananalyst.city')
  })

  it('renders documentation links', () => {
    render(<Home />)
    
    const docLinks = screen.getAllByRole('link', { name: /documentation/i })
    expect(docLinks.length).toBeGreaterThan(0)
  })

  it('renders github link', () => {
    render(<Home />)
    
    const githubLink = screen.getByRole('link', { name: /GitHub repository/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/mpadge/UrbanAnalyst/issues')
  })
})
