import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import TransformPage from '@/components/transform/transformPage'

vi.mock('@/components/utils/localStorageUtils', () => ({
  localStorageHelpers: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn()
  }
}))

vi.mock('@/components/utils/transformTourUtils', () => ({
  useTransformTourLogic: () => ({
    tourProps: { isOpen: false, close: vi.fn() },
    handleTourOpen: vi.fn()
  })
}))

vi.mock('@/components/transform/control', () => ({
  default: () => <div data-testid="control">Control</div>
}))

vi.mock('@/components/transform/legend', () => ({
  default: () => <div data-testid="legend">Legend</div>
}))

vi.mock('@/components/transform/transformPageDynamic', () => ({
  default: () => <div data-testid="map">Map</div>
}))

vi.mock('@/components/transform/tour/tour', () => ({
  default: () => <div data-testid="tour">Tour</div>
}))

vi.mock('@/data/citydata', () => ({
  CITY_DATA: {
    citiesArray: [
      {
        name: 'london',
        nameFormatted: 'London',
        initialViewState: { latitude: 51.5074, longitude: -0.1278, zoom: 10, pitch: 0, bearing: 0 },
        dataRanges: { transport: [0, 100, 50, 10], bike_index: [0, 100, 50, 10] },
        stats_single: {}
      },
      {
        name: 'paris',
        nameFormatted: 'Paris',
        initialViewState: { latitude: 48.8566, longitude: 2.3522, zoom: 10, pitch: 0, bearing: 0 },
        dataRanges: { transport: [0, 100, 50, 10], bike_index: [0, 100, 50, 10] },
        stats_single: {}
      }
    ]
  }
}))

vi.mock('@/components/utils/pageConstants', () => {
  const constants = {
    DEFAULT_CITY_INDEX: 0,
    DEFAULT_TARGET_CITY_INDEX: 1,
    DEFAULT_BIKE_INDEX_LAYER: 'bike_index',
    DEFAULT_TRANSPORT_LAYER: 'transport',
    DEFAULT_ALPHA: 0.5,
    DEFAULT_PITCH: 0,
    DEFAULT_BEARING: 0,
    DEFAULT_TRANSITION_DURATION: 2000,
    DEFAULT_LAYER_START_STOP: [0, 100] as [number, number],
    DEFAULT_LAYER_RANGE: [0, 100] as [number, number]
  }
  return {
    LAYER_CONSTANTS: constants,
    OUTPUT_LAYER_TYPES: { RELATIVE: 'relative' }
  }
})

vi.mock('@deck.gl/core/typed', () => ({
  FlyToInterpolator: class {
    constructor() {}
  }
}))

describe('TransformPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the TransformPage component', async () => {
    const { container } = render(<TransformPage />)

    await waitFor(() => {
      const control = container.querySelector('[data-testid="control"]')
      expect(control).toBeInTheDocument()
    })
  })

  it('renders control component', async () => {
    const { container } = render(<TransformPage />)

    await waitFor(() => {
      const control = container.querySelector('[data-testid="control"]')
      expect(control).toHaveTextContent('Control')
    })
  })

  it('renders legend component', async () => {
    const { container } = render(<TransformPage />)

    await waitFor(() => {
      const legend = container.querySelector('[data-testid="legend"]')
      expect(legend).toHaveTextContent('Legend')
    })
  })

  it('renders map component', async () => {
    const { container } = render(<TransformPage />)

    await waitFor(() => {
      const map = container.querySelector('[data-testid="map"]')
      expect(map).toHaveTextContent('Map')
    })
  })
})
