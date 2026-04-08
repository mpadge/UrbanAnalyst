import { describe, it, expect, vi, beforeEach } from 'vitest'
import { transformDataFunction, transformDataSelectCol } from '@/components/transform/callTransform'

vi.mock('@/../pkg/uamutations.js', () => ({
  initSync: vi.fn(),
  uamutate: vi.fn()
}))

vi.mock('@/components/utils/trimRange', () => ({
  trimRangeSDs: vi.fn((data) => data)
}))

describe('transformDataSelectCol', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('selects original column (index 0)', async () => {
    const mockData = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ]
    const setTransformDataOneCol = vi.fn()

    await transformDataSelectCol(mockData, 'original', setTransformDataOneCol)

    expect(setTransformDataOneCol).toHaveBeenCalledWith([1, 5, 9])
  })

  it('selects transformed column (index 1)', async () => {
    const mockData = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ]
    const setTransformDataOneCol = vi.fn()

    await transformDataSelectCol(mockData, 'transformed', setTransformDataOneCol)

    expect(setTransformDataOneCol).toHaveBeenCalledWith([2, 6, 10])
  })

  it('selects absolute column (index 2)', async () => {
    const mockData = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ]
    const setTransformDataOneCol = vi.fn()

    await transformDataSelectCol(mockData, 'absolute', setTransformDataOneCol)

    expect(setTransformDataOneCol).toHaveBeenCalledWith([3, 7, 11])
  })

  it('selects relative column (index 3)', async () => {
    const mockData = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ]
    const setTransformDataOneCol = vi.fn()

    await transformDataSelectCol(mockData, 'relative', setTransformDataOneCol)

    expect(setTransformDataOneCol).toHaveBeenCalledWith([4, 8, 12])
  })

  it('does not call setTransformDataOneCol when transformDataAll is null', async () => {
    const setTransformDataOneCol = vi.fn()

    await transformDataSelectCol(null, 'relative', setTransformDataOneCol)

    expect(setTransformDataOneCol).not.toHaveBeenCalled()
  })

  it('throws error for invalid output layer', async () => {
    const mockData = [[1, 2, 3, 4]]
    const setTransformDataOneCol = vi.fn()

    await expect(
      transformDataSelectCol(mockData, 'invalid', setTransformDataOneCol)
    ).rejects.toThrow('Invalid output layer')
  })
})

describe('transformDataFunction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('NEXT_PUBLIC_NUM_TRANSFORM_SAMPLES', '10000')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('throws error when data1 is null', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction(null, [1, 2, 3], ['varname'], setTransformDataAll, onComplete)
    ).rejects.toThrow('Data1 or Data2 is null/undefined')
  })

  it('throws error when data2 is null', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction([1, 2, 3], null, ['varname'], setTransformDataAll, onComplete)
    ).rejects.toThrow('Data1 or Data2 is null/undefined')
  })

  it('throws error when data1 is not an object', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction(123, [1, 2, 3], ['varname'], setTransformDataAll, onComplete)
    ).rejects.toThrow('Data is not object type')
  })

  it('throws error when data2 is not an object', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction([1, 2, 3], 456, ['varname'], setTransformDataAll, onComplete)
    ).rejects.toThrow('Data is not object type')
  })

  it('throws error when varnames array is empty', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction({ a: 1 }, { b: 2 }, [], setTransformDataAll, onComplete)
    ).rejects.toThrow('Var names array is empty')
  })

  it('throws error when varnames is null', async () => {
    const setTransformDataAll = vi.fn()
    const onComplete = vi.fn()

    await expect(
      transformDataFunction({ a: 1 }, { b: 2 }, null as unknown as string[], setTransformDataAll, onComplete)
    ).rejects.toThrow('Var names array is empty')
  })
})
