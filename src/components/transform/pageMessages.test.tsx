import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import TransformMsgs from '@/components/transform/pageMessages'

vi.mock('@/components/windowSize', () => ({
  default: () => ({ width: 800, height: 600 })
}))

vi.mock('d3', () => ({
  select: vi.fn(() => ({
    selectAll: vi.fn(() => ({
      remove: vi.fn(),
      join: vi.fn().mockReturnThis()
    })),
    append: vi.fn(() => ({
      call: vi.fn().mockReturnThis(),
      attr: vi.fn().mockReturnThis(),
      text: vi.fn().mockReturnThis(),
      remove: vi.fn(),
      select: vi.fn().mockReturnThis()
    }))
  }))
}))

describe('TransformMsgs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders message container', () => {
    render(<TransformMsgs msg="Test message" />)
    const container = document.getElementById('message-container')
    expect(container).toBeInTheDocument()
  })
})
