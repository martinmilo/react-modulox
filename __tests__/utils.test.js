import { breakpointStyle } from '../src/utils'

const { breakpoints } = require('../config')

describe('Styles without any media queries', () => {
	it('returns style string without any media queries', () => {
		expect(breakpointStyle(breakpoints[0], 'center')).toBe('center');
	})
})
