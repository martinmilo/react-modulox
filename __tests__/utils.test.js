import { propertyGenerator, propertiesIterator } from '../src/utils'

const { breakpoints } = require('../config')

describe('Test propertyGenerator', () => {
	const bp = breakpoints[0]
	it('returns css string as expected', () => {
		expect(
			propertyGenerator('display', 'flex', false, '', '', bp)
		).toBe('display: flex;')
	})
	it('should return css string with unit', () => {
		expect(
			propertyGenerator('width', 100, false, '%', '', bp)
		).toBe('width: 100%;')
	})
	it('should return fallback value', () => {
		expect(
			propertyGenerator('background', undefined, false, '', 'blue', bp)
		).toBe('background: blue;')
	})
	it('should still return one line styles even with media queries', () => {
		expect(
			propertyGenerator('height', 500, true, 'px', '', bp)
		).toBe('height: 500px;')
	})
})

describe('Test propertyGenerator multiple media queries', () => {
	const expectedCSS = breakpoint => {
		if (breakpoint.size === 'xs') return 'display: flex;'
		if (breakpoint.size === 'xt') return 'display: none;'
		return ``
	}
	breakpoints.map(breakpoint => {
		it(`should generate style for this breakpoint ${breakpoint.size}`, () => {
			expect(
				propertyGenerator('display', 's:|flex|, t:|none|', true, '', '', breakpoint)
			).toBe(expectedCSS(breakpoint))
		})
	})
})

describe('Test propertiesIterator', () => {
	it('should return multiple css lines', () => {
		expect(
			propertiesIterator([
				['display', 'block'],
				['position', 'absolute'],
			], breakpoints[0])
		).toBe('display: block;position: absolute;')
	})
})
