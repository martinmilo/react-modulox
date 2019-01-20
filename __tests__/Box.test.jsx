import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Box from '../src/Box'

describe('Box with different render methods', () => {
	it('renders the Box with initial style rules', () => {
		const tree = renderer
			.create(<Box>Content</Box>)
			.toJSON()
		expect(tree).toHaveStyleRule('margin', 'initial')
		expect(tree).toHaveStyleRule('flex-basis', '100%')
		expect(tree).toHaveStyleRule('flex-direction', 'column')
	})

	it('renders the Box with changed style rules', () => {
		const tree = renderer
			.create(<Box display="block">Content</Box>)
			.toJSON()
		expect(tree).toHaveStyleRule('display', 'block')
	})

	it('render the Box and set the props', () => {
		const component = mount(<Box align="left" />)
		expect(component.prop('align')).toBe('left')
	})

	it('render the Box and the children HTML elements', () => {
		const component = shallow((
			<Box>
				<div className="test">Test</div>
			</Box>
		))
		expect(component.contains(<div className="test">Test</div>)).toBe(true)
	})
})
