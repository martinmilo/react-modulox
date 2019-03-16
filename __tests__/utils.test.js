import { propertyGenerator, propertiesIterator } from '../src/utils/'
import theme from '../src/theme/'

describe('Test propertyGenerator', () => {
  const breakpoint = theme.breakpoints[0]
  const cssStyle = (key, value, media = false, unit = '', defaultValue = '') =>
    propertyGenerator(key, value, media, unit, defaultValue, breakpoint, theme)

  it('should return CSS styles when simple string value', () => {
    expect(cssStyle('display', 'flex')).toBe('display: flex;')
    expect(cssStyle('width', '100%')).toBe('width: 100%;')
    expect(cssStyle('margin', '5px 0')).toBe('margin: 5px 0;')
    expect(cssStyle('transition', '125ms linear')).toBe('transition: 125ms linear;')
    expect(cssStyle('flex-direction', 'column')).toBe('flex-direction: column;')
    expect(cssStyle('max-height', '500px')).toBe('max-height: 500px;')
  })

  it('should return css string when number value', () => {
    expect(cssStyle('padding', 20)).toBe('padding: 20px;')
    expect(cssStyle('margin', 50)).toBe('margin: 50px;')
    expect(cssStyle('max-height', 120)).toBe('max-height: 120px;')
  })

  it('should return correct background or color from theme', () => {
    expect(cssStyle('background', 'red')).toBe('background: #d41111;')
    expect(cssStyle('color', 'green')).toBe('color: #228B22;')
  })

  it('should return max-width based on flex-basis if no value', () => {
    expect(cssStyle('max-width', undefined, true, '', '100%')).toBe(
      'max-width: 100%;'
    )
  })

  it('should return fallback value', () => {
    expect(cssStyle('background', undefined, false, '', 'blue')).toBe(
      'background: blue;'
    )
  })

  it('should still return one line of styles even with media queries', () => {
    expect(cssStyle('height', 500, true)).toBe('height: 500px;')
  })
})

describe('Test propertyGenerator that calls breakpointStyle', () => {
  const expectedCSS = breakpoint => {
    if (breakpoint.size === 'xt') return 'display: flex;'
    if (breakpoint.size === 'xm') return 'display: none;'
    return ``
  }
  theme.breakpoints.map(breakpoint => {
    it(`should generate style for this breakpoint ${breakpoint.size}`, () => {
      expect(
        propertyGenerator(
          'display',
          't:|flex|, m:|none|',
          true,
          '',
          '',
          breakpoint,
          theme
        )
      ).toBe(expectedCSS(breakpoint))
    })
  })
})

describe('Test propertiesIterator', () => {
  it('should return multiple css lines', () => {
    expect(
      propertiesIterator(
        [['display', 'block'], ['position', 'absolute']],
        theme.breakpoints[0],
        theme
      )
    ).toBe('display: block;position: absolute;')
  })
})
