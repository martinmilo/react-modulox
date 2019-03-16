import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Row from '../src/components/Row'

const Component = (props, children = 'Content') => <Row {...props}>{children}</Row>

describe('Row with different render methods', () => {
  it('renders the Row with initial style rules', () => {
    const tree = renderer.create(Component()).toJSON()
    expect(tree).toHaveStyleRule('justify-content', 'space-between')
    expect(tree).toHaveStyleRule('align-items', 'center')
  })

  it('renders the Row with changed style rules', () => {
    const tree = renderer.create(Component({ align: 'flex-end' })).toJSON()
    expect(tree).toHaveStyleRule('align-items', 'flex-end')
  })

  it('renders the Box with initial style rules', () => {
    const tree = renderer
      .create(Component({ width: 300, height: 500, background: 'red' }))
      .toJSON()
    expect(tree).toHaveStyleRule('width', '300px')
    expect(tree).toHaveStyleRule('max-height', '500px')
    expect(tree).toHaveStyleRule('max-width', '300px')
    expect(tree).toHaveStyleRule('background', '#d41111')
  })

  it('render the Row and set the props', () => {
    const component = mount(Component({ justify: 'center' }))
    expect(component.prop('justify')).toBe('center')
  })

  it('render the Row and the children HTML elements', () => {
    const component = shallow(Component({}, <div className="test">Test</div>))
    expect(component.contains(<div className="test">Test</div>)).toBe(true)
  })
})
