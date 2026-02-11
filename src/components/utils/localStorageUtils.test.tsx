import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { localStorageHelpers, sessionStorageHelpers, loadInitialState, usePersistedState, COMPARE_STORAGE_KEYS } from '@/components/utils/localStorageUtils'

describe('localStorageHelpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('getItem', () => {
    it('returns null when window is undefined', () => {
      const result = localStorageHelpers.getItem('testKey')
      expect(result).toBeNull()
    })

    it('returns value from localStorage when window is defined', () => {
      const mockValue = 'testValue'
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockValue)

      const result = localStorageHelpers.getItem('testKey')

      expect(result).toBe(mockValue)
      expect(getItemMock).toHaveBeenCalledWith('testKey')
    })
  })

  describe('setItem', () => {
    it('does not throw when window is undefined', () => {
      expect(() => localStorageHelpers.setItem('testKey', 'testValue')).not.toThrow()
    })

    it('sets value in localStorage when window is defined', () => {
      const setItemMock = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {})

      localStorageHelpers.setItem('testKey', 'testValue')

      expect(setItemMock).toHaveBeenCalledWith('testKey', 'testValue')
    })
  })

  describe('removeItem', () => {
    it('does not throw when window is undefined', () => {
      expect(() => localStorageHelpers.removeItem('testKey')).not.toThrow()
    })

    it('removes value from localStorage when window is defined', () => {
      const removeItemMock = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {})

      localStorageHelpers.removeItem('testKey')

      expect(removeItemMock).toHaveBeenCalledWith('testKey')
    })
  })

  describe('getInt', () => {
    it('returns fallback when value is null', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

      const result = localStorageHelpers.getInt('testKey', 42)

      expect(result).toBe(42)
      expect(getItemMock).toHaveBeenCalledWith('testKey')
    })

    it('returns parsed integer when value is valid', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('123')

      const result = localStorageHelpers.getInt('testKey')

      expect(result).toBe(123)
    })

    it('returns fallback when value is not a valid integer', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('notANumber')

      const result = localStorageHelpers.getInt('testKey', 99)

      expect(result).toBe(99)
    })
  })

  describe('getFloat', () => {
    it('returns fallback when value is null', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

      const result = localStorageHelpers.getFloat('testKey', 3.14)

      expect(result).toBe(3.14)
      expect(getItemMock).toHaveBeenCalledWith('testKey')
    })

    it('returns parsed float when value is valid', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('3.14159')

      const result = localStorageHelpers.getFloat('testKey')

      expect(result).toBeCloseTo(3.14159)
    })

    it('returns fallback when value is not a valid float', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('notANumber')

      const result = localStorageHelpers.getFloat('testKey', 1.5)

      expect(result).toBe(1.5)
    })
  })

  describe('getString', () => {
    it('returns fallback when value is null', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

      const result = localStorageHelpers.getString('testKey', 'default')

      expect(result).toBe('default')
    })

    it('returns value from localStorage when it exists', () => {
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('storedValue')

      const result = localStorageHelpers.getString('testKey', 'default')

      expect(result).toBe('storedValue')
    })
  })
})

describe('sessionStorageHelpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('getItem', () => {
    it('returns null when window is undefined', () => {
      const result = sessionStorageHelpers.getItem('testKey')
      expect(result).toBeNull()
    })

    it('returns value from sessionStorage when window is defined', () => {
      const mockValue = 'sessionTestValue'
      const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockValue)

      const result = sessionStorageHelpers.getItem('testKey')

      expect(result).toBe(mockValue)
      expect(getItemMock).toHaveBeenCalledWith('testKey')
    })
  })

  describe('setItem', () => {
    it('does not throw when window is undefined', () => {
      expect(() => sessionStorageHelpers.setItem('testKey', 'testValue')).not.toThrow()
    })

    it('sets value in sessionStorage when window is defined', () => {
      const setItemMock = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {})

      sessionStorageHelpers.setItem('testKey', 'testValue')

      expect(setItemMock).toHaveBeenCalledWith('testKey', 'testValue')
    })
  })
})

describe('loadInitialState', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('returns default values when no stored values exist', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

        const result = loadInitialState()

        expect(result).toEqual({
            idx: 0,
            layer: 'social_index',
            layer2: '',
            numLayers: 'Single',
            alpha: 0.5
        })
    })

    it('returns stored values when they exist', () => {
        const getItemMock = vi.spyOn(Storage.prototype, 'getItem')
        getItemMock.mockImplementation((key: string) => {
            const values: Record<string, string> = {
                'uaCityIdx': '5',
                'uaLayer': 'transport',
                'uaLayer2': 'bike_index',
                'uaNumLayers': 'Paired',
                'uaAlpha': '0.75'
            }
            return values[key] || null
        })

        const result = loadInitialState()

        expect(result).toEqual({
            idx: 5,
            layer: 'transport',
            layer2: 'bike_index',
            numLayers: 'Paired',
            alpha: 0.75
        })
    })
})
