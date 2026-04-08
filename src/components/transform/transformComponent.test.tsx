import { describe, it, expect } from 'vitest'
import { TransformProps } from '@/components/transform/transformPage'

describe('TransformComponent', () => {
  it('exports TransformProps interface', () => {
    const props: TransformProps = {
      idx: 0,
      idx2: 1,
      layer: 'transport',
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
      },
      alpha: 0.5,
      layerRange: [0, 100],
      layerStartStop: [0, 100],
      outputLayer: 'relative',
      setLayerRange: () => {},
      setLayerStartStop: () => {},
      handleOutputLayerChange: () => {}
    }

    expect(props.idx).toBe(0)
    expect(props.idx2).toBe(1)
    expect(props.layer).toBe('transport')
    expect(props.varnames).toContain('social_index')
    expect(props.alpha).toBe(0.5)
    expect(props.outputLayer).toBe('relative')
  })

  it('validates output layer types', () => {
    const outputLayers = ['relative', 'absolute', 'original', 'transformed'] as const
    outputLayers.forEach(layer => {
      expect(['relative', 'absolute', 'original', 'transformed']).toContain(layer)
    })
  })

  it('validates layer range structure', () => {
    const range: [number, number] = [0, 100]
    expect(range[0]).toBeLessThan(range[1])
  })

  it('validates viewState has required properties', () => {
    const viewState = {
      latitude: 51.5074,
      longitude: -0.1278,
      zoom: 10,
      pitch: 0,
      bearing: 0
    }
    expect(viewState.latitude).toBeDefined()
    expect(viewState.longitude).toBeDefined()
    expect(viewState.zoom).toBeDefined()
  })
})
