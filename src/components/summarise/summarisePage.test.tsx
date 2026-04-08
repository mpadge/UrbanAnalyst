import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SummarisePage from '@/components/summarise/summarisePage'

vi.mock('@/components/summarise/control', () => ({
  default: () => <div data-testid="summarise-control" />
}))

vi.mock('@/components/summarise/citySummaryData', () => ({
  default: () => [
    { name: 'City 1', content: <div>City 1 content</div> },
    { name: 'City 2', content: <div>City 2 content</div> },
  ]
}))

vi.mock('@/components/utils/localStorageUtils', () => ({
  localStorageHelpers: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
  },
}))

describe('SummarisePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default idx 0 when no stored value', () => {
    render(<SummarisePage />)
    expect(screen.getByTestId('summarise-control')).toBeInTheDocument()
  })

  it('renders city content based on idx', () => {
    render(<SummarisePage />)
    expect(screen.getByText(/City 1 content/i)).toBeInTheDocument()
  })
})
