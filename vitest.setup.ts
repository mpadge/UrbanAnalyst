import '@testing-library/jest-dom'
import { vi } from 'vitest'

const originalWrite = process.stderr.write.bind(process.stderr)

process.stderr.write = vi.fn((chunk: string | Buffer, encoding?: unknown, callback?: unknown): boolean => {
    if (typeof chunk === 'string' && chunk.includes('Test error')) {
        return true
    }
    return originalWrite(chunk, encoding as string, callback as (err?: Error) => void)
})
