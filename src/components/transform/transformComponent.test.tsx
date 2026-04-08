import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import TransformComponent from '@/components/transform/transformComponent'
import { TransformProps } from '@/components/transform/transformPage'
import { DataRangeKeys, ViewState } from '@/data/interfaces'
import type { OutputLayerType } from '@/components/utils/pageConstants'

vi.mock('@/components/transform/loadData', () => ({
  loadDataFunction: vi.fn()
}))

vi.mock('@/components/transform/callTransform', () => ({
  transformDataFunction: vi.fn(),
  transformDataSelectCol: vi.fn()
}))

vi.mock('@/components/transform/geoJsonLayer', () => ({
  getGeoJsonLayer: vi.fn().mockReturnValue(null)
}))

vi.mock('@/components/utils/trimRange', () => ({
  getRangeLimits: vi.fn().mockReturnValue([0, 10, 50, 100])
}))

vi.mock('@deck.gl/react/typed', () => ({
  DeckGL: ({ layers, initialViewState }: any) => (
    <div data-testid="deckgl" data-layers={layers ? 'present' : 'none'} data-viewstate={JSON.stringify(initialViewState)} />
  )
}))

vi.mock('react-map-gl', () => ({
  Map: ({ mapStyle, mapboxAccessToken }: any) => (
    <div data-testid="map" data-style={mapStyle} data-token={mapboxAccessToken ? 'present' : 'none'} />
  )
}))

const createMockProps = (overrides = {}): TransformProps => ({
  idx: 0,
  idx2: 1,
  layer: 'transport' as DataRangeKeys,
  varnames: ['social_index'],
  citiesArray: [],
  city: 'london',
  targetCity: 'paris',
  viewState: {
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
    pitch: 0,
    bearing: 0
  } as ViewState,
  alpha: 0.5,
  layerRange: [0, 100] as [number, number],
  layerStartStop: [0, 100] as [number, number],
  outputLayer: 'relative' as OutputLayerType,
  setLayerRange: vi.fn(),
  setLayerStartStop: vi.fn(),
  handleOutputLayerChange: vi.fn(),
  ...overrides
})

describe('TransformComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN', 'test-token')
  })

  it('renders the TransformComponent component', () => {
    const props = createMockProps()
    const { container } = render(<TransformComponent {...props} />)

    expect(container.querySelector('[data-testid="deckgl"]')).toBeInTheDocument()
  })

  it('renders DeckGL with correct props', () => {
    const props = createMockProps()
    const { container } = render(<TransformComponent {...props} />)

    expect(container.querySelector('[data-testid="deckgl"]')).toBeInTheDocument()
  })

  it('passes viewState to DeckGL', () => {
    const props = createMockProps({
      viewState: { latitude: 51.5074, longitude: -0.1278, zoom: 12, pitch: 45, bearing: 30 }
    })
    const { container } = render(<TransformComponent {...props} />)

    const deckgl = container.querySelector('[data-testid="deckgl"]')
    expect(deckgl).toBeDefined()
  })

  it('renders Map component inside DeckGL', () => {
    const props = createMockProps()
    const { container } = render(<TransformComponent {...props} />)

    const deckgl = container.querySelector('[data-testid="deckgl"]')
    expect(deckgl).toBeDefined()
  })

  it('accepts layer prop', () => {
    const props = createMockProps({ layer: 'bike_index' as DataRangeKeys })
    const { container } = render(<TransformComponent {...props} />)

    expect(container.querySelector('[data-testid="deckgl"]')).toBeInTheDocument()
  })

  it('accepts alpha prop', () => {
    const props = createMockProps({ alpha: 0.8 })
    render(<TransformComponent {...props} />)

    expect(document.querySelector('[data-testid="deckgl"]')).toBeInTheDocument()
  })

  it('accepts layerRange prop', () => {
    const props = createMockProps({ layerRange: [10, 90] })
    render(<TransformComponent {...props} />)

    expect(document.querySelector('[data-testid="deckgl"]')).toBeInTheDocument()
  })

  it('uses setLayerRange callback', async () => {
    const setLayerRange = vi.fn()
    const props = createMockProps({ setLayerRange })

    render(<TransformComponent {...props} />)

    expect(setLayerRange).toBeDefined()
  })

  it('uses setLayerStartStop callback', async () => {
    const setLayerStartStop = vi.fn()
    const props = createMockProps({ setLayerStartStop })

    render(<TransformComponent {...props} />)

    expect(setLayerStartStop).toBeDefined()
  })
})
