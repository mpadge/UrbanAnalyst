import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CityDataProps } from '@/data/interfaces'

const mockCitiesArray: CityDataProps[] = [
  {
    name: 'city1',
    nameFormatted: 'City 1',
    path: '/data/city1',
    social_index: 'test',
    initialViewState: { latitude: 0, longitude: 0, zoom: 10, pitch: 0, bearing: 0 },
    dataRanges: {},
    dataRangesPaired: {},
    stats_single: {
      social_index: [50],
      times_rel: [30],
      times_abs: [60],
      transfers: [2],
      intervals: [10],
      transport: [40],
      popdens: [100],
      school_dist: [5],
      bike_index: [70],
      natural: [80],
      parking: [20],
    },
    stats_paired: {},
  },
  {
    name: 'city2',
    nameFormatted: 'City 2',
    path: '/data/city2',
    social_index: 'test',
    initialViewState: { latitude: 0, longitude: 0, zoom: 10, pitch: 0, bearing: 0 },
    dataRanges: {},
    dataRangesPaired: {},
    stats_single: {
      social_index: [40],
      times_rel: [20],
      times_abs: [50],
      transfers: [3],
      intervals: [15],
      transport: [35],
      popdens: [90],
      school_dist: [4],
      bike_index: [60],
      natural: [70],
      parking: [25],
    },
    stats_paired: {},
  },
] as unknown as CityDataProps[]

vi.mock('next/font/local', () => ({
  default: () => ({ className: 'mock-font' })
}))

describe('DefaultExtraLayers', () => {
  let DefaultExtraLayersFn: any

  beforeEach(async () => {
    const controlModule = await import('@/components/transform/control')
    DefaultExtraLayersFn = controlModule.DefaultExtraLayers
  })

  it('returns layers where target city has better values than source', () => {
    const result = DefaultExtraLayersFn({
      idx: 0,
      idx2: 1,
      layer: 'bike_index',
      citiesArray: mockCitiesArray,
    })

    expect(result).toBeInstanceOf(Array)
    expect(result).toContain('times_rel')
  })

  it('excludes the selected layer from results', () => {
    const result = DefaultExtraLayersFn({
      idx: 0,
      idx2: 1,
      layer: 'times_rel',
      citiesArray: mockCitiesArray,
    })

    expect(result).not.toContain('times_rel')
  })
})
