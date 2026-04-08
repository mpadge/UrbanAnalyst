import { describe, it, expect } from 'vitest'

describe('TransformPage', () => {
  it('can import TransformProps interface', async () => {
    const pageModule = await import('@/components/transform/transformPage')
    expect(pageModule).toBeDefined()
    expect(pageModule.default).toBeDefined()
  })
})
