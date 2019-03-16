import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Box from '../src/components/Box'

const Component = (props, children = 'Content') => <Box {...props}>{children}</Box>

describe('Box with different render methods', () => {
  it('renders the Box with initial style rules', () => {
    const tree = renderer.create(Component()).toJSON()
    expect(tree).toHaveStyleRule('margin', 'initial')
    expect(tree).toHaveStyleRule('flex-basis', '100%')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
  })

  it('renders the Box with initial style rules', () => {
    const tree = renderer
      .create(Component({ width: 200, background: 'red' }))
      .toJSON()
    expect(tree).toHaveStyleRule('max-width', '200px')
    expect(tree).toHaveStyleRule('background', '#d41111')
  })

  it('renders the Box with changed style rules', () => {
    const tree = renderer.create(Component({ display: 'block' })).toJSON()
    expect(tree).toHaveStyleRule('display', 'block')
  })

  it('render the Box and set the props', () => {
    const component = mount(Component({ align: 'left' }))
    expect(component.prop('align')).toBe('left')
  })

  it('render the Box and the children HTML elements', () => {
    const component = shallow(Component({}, <div className="test">Test</div>))
    expect(component.contains(<div className="test">Test</div>)).toBe(true)
  })
})
