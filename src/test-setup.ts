// Suppress React warnings during tests
const originalWarn = console.warn
const originalError = console.error

console.warn = (...args) => {
  // Filter out React warnings about DOM props in mocks
  const message = args[0]
  if (
    message?.includes('React does not recognize') ||
    message?.includes('Invalid value for prop') ||
    message?.includes('key is not a prop')
  ) {
    return
  }
  originalWarn(...args)
}

console.error = (...args) => {
  const message = args[0]
  if (
    message?.includes('React does not recognize') ||
    message?.includes('Invalid value for prop')
  ) {
    return
  }
  originalError(...args)
}
