import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Row from '../src/Row'

describe('Row with different render methods', () => {
	it('renders the Row with initial style rules', () => {
		const tree = renderer
			.create(<Row>Content</Row>)
			.toJSON()
		expect(tree).toHaveStyleRule('justify-content', 'space-between')
		expect(tree).toHaveStyleRule('align-items', 'center')
	})

	it('renders the Row with changed style rules', () => {
		const tree = renderer
			.create(<Row align="end">Content</Row>)
			.toJSON()
		expect(tree).toHaveStyleRule('align-items', 'end')
	})

	it('render the Row and set the props', () => {
		const component = mount(<Row justify="center" />)
		expect(component.prop('justify')).toBe('center')
	})

	it('render the Row and the children HTML elements', () => {
		const component = shallow((
			<Row>
				<div className="test">Test</div>
			</Row>
		))
		expect(component.contains(<div className="test">Test</div>)).toBe(true)
	})
})
