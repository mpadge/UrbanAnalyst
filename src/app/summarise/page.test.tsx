import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/summarise/page'

vi.mock('@/components/appBar', () => ({
  default: ({ text }: { text: string[] }): JSX.Element => (
    <div data-testid="app-bar">{text.join(',')}</div>
  )
}))

vi.mock('@/components/summarise/summarisePage', () => ({
  default: (): JSX.Element => <div data-testid="summarise-page" />
}))

describe('Summarise Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app bar with correct navigation items', () => {
    render(<Home />)
    
    const appBar = screen.getByTestId('app-bar')
    expect(appBar).toBeInTheDocument()
    expect(appBar).toHaveTextContent('home,compare,map,transform,about')
  })

  it('renders the SummarisePage component', () => {
    render(<Home />)
    
    expect(screen.getByTestId('summarise-page')).toBeInTheDocument()
  })
})
