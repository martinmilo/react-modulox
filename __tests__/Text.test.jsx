import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Text from '../src/components/Text'

const Component = (props, children = 'Hello') => <Text {...props}>{children}</Text>

describe('Text with different render methods', () => {
  it('renders the Text with initial style rules', () => {
    const tree = renderer.create(Component()).toJSON()
    expect(tree).toHaveStyleRule('font-weight', 'normal')
    expect(tree).toHaveStyleRule('font-size', '15px')
    expect(tree).toHaveStyleRule('color', 'black')
  })

  it('renders the Text with changed style rules', () => {
    const tree = renderer
      .create(Component({ color: 'yellow', space: 'pre-line' }))
      .toJSON()
    expect(tree).toHaveStyleRule('color', 'yellow')
    expect(tree).toHaveStyleRule('white-space', 'pre-line')
  })

  it('renders the Text with default theme properties', () => {
    const tree = renderer.create(Component({ color: 'red' })).toJSON()
    expect(tree).toHaveStyleRule('color', '#d41111')
    expect(tree).toHaveStyleRule('font-family', "'Roboto',serif")
    expect(tree).toHaveStyleRule('font-size', '15px')
  })

  it('renders the Text with correct style rules for h1', () => {
    const tree = renderer.create(Component({ element: 'h1' })).toJSON()
    expect(tree).toHaveStyleRule('color', 'black')
    expect(tree).toHaveStyleRule('font-family', "'Playfair Display',sans-serif")
    expect(tree).toHaveStyleRule('font-size', '24px')
  })

  it('render the Text and set the props', () => {
    const component = mount(Component({ transform: 'uppercase' }))
    expect(component.prop('transform')).toBe('uppercase')
  })

  it('render the Text and the children HTML elements', () => {
    const component = shallow(Component({}, <div className="test">Test</div>))
    expect(component.contains(<div className="test">Test</div>)).toBe(true)
  })
})
