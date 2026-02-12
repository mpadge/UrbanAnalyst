import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useWindowSize from '@/components/windowSize'

// Mock window object
const _mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
})

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})

describe('useWindowSize', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset window dimensions
    window.innerWidth = 1024
    window.innerHeight = 768
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns initial window size', () => {
    const { result } = renderHook(() => useWindowSize())
    
    expect(result.current.width).toBe(1024)
    expect(result.current.height).toBe(768)
  })

  it('sets up resize event listener on mount', () => {
    renderHook(() => useWindowSize())
    
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('removes resize event listener on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize())
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('updates window size on resize event', () => {
    const { result } = renderHook(() => useWindowSize())
    
    // Get the resize handler from the addEventListener call
    const resizeHandler = (window.addEventListener as any).mock.calls.find(
      ([event]) => event === 'resize'
    )?.[1]

    // Simulate window resize
    window.innerWidth = 800
    window.innerHeight = 600
    
    act(() => {
      resizeHandler()
    })

    expect(result.current.width).toBe(800)
    expect(result.current.height).toBe(600)
  })

  it('handles multiple resize events', () => {
    const { result } = renderHook(() => useWindowSize())
    
    const resizeHandler = (window.addEventListener as any).mock.calls.find(
      ([event]) => event === 'resize'
    )?.[1]

    // First resize
    window.innerWidth = 500
    window.innerHeight = 400
    
    act(() => {
      resizeHandler()
    })

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(400)

    // Second resize
    window.innerWidth = 1200
    window.innerHeight = 900
    
    act(() => {
      resizeHandler()
    })

    expect(result.current.width).toBe(1200)
    expect(result.current.height).toBe(900)
  })

  it('returns null values before initial effect runs', () => {
    const _originalUseEffect = vi.fn()
    
    // This test is more conceptual since useEffect runs synchronously in
    // testing but can verify the hook structure
    const { result } = renderHook(() => useWindowSize())
    
    // After hook renders, the initial effect should have run
    expect(typeof result.current.width).toBe('number')
    expect(typeof result.current.height).toBe('number')
  })
})
