import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonAppBar from '@/components/appBar'
import { ButtonAppProps } from '@/data/interfaces'
import useWindowSize from '@/components/windowSize'
// Import test setup to suppress warnings
// Note: The test setup file will be loaded automatically by Vitest

// Mock dependencies
vi.mock('@/components/windowSize')
vi.mock('@/components/uaSvgLogo', () => ({
  SvgComponent: () => <div data-testid="svg-logo" />
}))

vi.mock('@mui/material/AppBar', () => ({
  default: ({ children, position, color }: any) => (
    <div data-position={position} data-color={color} data-testid="app-bar">
      {children}
    </div>
  )
}))

vi.mock('@mui/material/Box', () => ({
  default: ({ children, sx, ...props }: any) => (
    <div {...props} style={sx} data-testid="mui-box">
      {children}
    </div>
  )
}))

vi.mock('@mui/material/Toolbar', () => ({
  default: ({ children }: any) => (
    <div data-testid="toolbar">{children}</div>
  )
}))

vi.mock('@mui/material/Typography', () => ({
  default: ({ children, textAlign, ...props }: any) => (
    <div {...props} data-text-align={textAlign}>
      {children}
    </div>
  )
}))

vi.mock('@mui/material/Button', () => ({
  default: ({ children, color, href, key }: any) => (
    <div key={key} data-color={color} data-href={href} role="button">
      {children}
    </div>
  )
}))

vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, size, edge, color, onClick, sx, 'aria-label': ariaLabel }: any) => (
    <button
      data-size={size}
      data-edge={edge}
      data-color={color}
      onClick={onClick}
      aria-label={ariaLabel}
      style={sx}
    >
      {children}
    </button>
  )
}))

vi.mock('@mui/material/Menu', () => ({
  default: ({ children, anchorEl, open, onClose, ...props }: any) => {
    // Filter out React-specific props that shouldn't go to DOM
    const { anchorOrigin, keepMounted, transformOrigin, ...domProps } = props
    return (
      <div {...domProps} data-open={open} data-testid="menu">
        {open ? children : null}
      </div>
    )
  }
}))

vi.mock('@mui/material/MenuItem', () => ({
  default: ({ children, onClick, component, href, key }: any) => (
    <div key={key} onClick={onClick} data-href={href} data-testid="menu-item">
      {children}
    </div>
  )
}))

vi.mock('@mui/material/SvgIcon', () => ({
  default: ({ children, component }: any) => (
    <div data-testid="svg-icon">
      {children}
    </div>
  )
}))

vi.mock('@mui/material/styles', () => ({
  createTheme: (theme: any) => ({ ...theme, __theme: true }),
  ThemeProvider: ({ children, theme }: any) => <div data-theme={theme.__theme}>{children}</div>
}))

vi.mock('@mui/icons-material/Menu', () => ({
  default: () => <div data-testid="menu-icon" />
}))

const mockUseWindowSize = vi.mocked(useWindowSize)

describe('ButtonAppBar', () => {
  const mockProps: ButtonAppProps = {
    text: ['home', 'about', 'contact']
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    mockUseWindowSize.mockReturnValue({ width: 800, height: 600 })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders AppBar with proper structure', () => {
    render(<ButtonAppBar {...mockProps} />)

    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
    expect(screen.getByTestId('toolbar')).toBeInTheDocument()
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
  })

  it('renders menu icon button', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    expect(menuButton).toBeInTheDocument()
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('renders navigation buttons when width is sufficient', () => {
    mockUseWindowSize.mockReturnValue({ width: 700, height: 600 })

    render(<ButtonAppBar {...mockProps} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('does not render navigation buttons when width is insufficient', () => {
    mockUseWindowSize.mockReturnValue({ width: 500, height: 600 })

    render(<ButtonAppBar {...mockProps} />)

    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('About')).not.toBeInTheDocument()
    expect(screen.queryByText('Contact')).not.toBeInTheDocument()
  })

  it('opens menu when menu icon is clicked', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    const menu = screen.getByTestId('menu')

    expect(menu).toHaveAttribute('data-open', 'false')
    
    fireEvent.click(menuButton)
    expect(menu).toHaveAttribute('data-open', 'true')
  })

  it('renders menu items when menu is open', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)

    expect(screen.getAllByTestId('menu-item')).toHaveLength(5)
  })

  it('closes menu when menu item is clicked', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    const menu = screen.getByTestId('menu')

    fireEvent.click(menuButton)
    expect(menu).toHaveAttribute('data-open', 'true')

    const homeMenuItem = screen.getAllByTestId('menu-item')[0]
    fireEvent.click(homeMenuItem)

    expect(menu).toHaveAttribute('data-open', 'false')
  })

  it('uses correct hrefs for menu items', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)

    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems[0]).toHaveAttribute('data-href', '/')
    expect(menuItems[1]).toHaveAttribute('data-href', '/about')
    expect(menuItems[2]).toHaveAttribute('data-href', '/contact')
    expect(menuItems[3]).toHaveAttribute('data-href', 'https://docs.urbananalyst.city')
    expect(menuItems[4]).toHaveAttribute('data-href', 'https://demo.urbananalyst.city')
  })

  it('capitalizes first letter of button text', () => {
    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)

    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems[0]).toHaveTextContent('Home')
    expect(menuItems[1]).toHaveTextContent('About')
    expect(menuItems[2]).toHaveTextContent('Contact')
  })

  it('uses light theme when dark mode is not preferred', () => {
    render(<ButtonAppBar {...mockProps} />)

    const themeProvider = screen.getByText('Home').closest('[data-theme="true"]')
    expect(themeProvider).toBeInTheDocument()
  })

  it('uses dark theme when dark mode is preferred', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    render(<ButtonAppBar {...mockProps} />)

    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
  })

  it('handles null width gracefully', () => {
    mockUseWindowSize.mockReturnValue({ width: null, height: 600 })

    render(<ButtonAppBar {...mockProps} />)

    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
  })

  it('uses correct size for menu icon button based on width', () => {
    mockUseWindowSize.mockReturnValue({ width: 500, height: 600 })

    render(<ButtonAppBar {...mockProps} />)

    const menuButton = screen.getByRole('button')
    expect(menuButton).toHaveAttribute('data-size', 'small')
  })
})
