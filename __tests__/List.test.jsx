import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import List from '../src/components/List'

const Component = (props, data = [1, 2, 3]) => (
  <List
    {...props}
    data={data}
    renderItem={(item, index) => <li key={index}>{item}</li>}
  />
)

describe('List with different render methods', () => {
  it('renders the List with initial style rules', () => {
    const tree = renderer.create(Component()).toJSON()
    expect(tree).toHaveStyleRule('flex-basis', '100%')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
  })

  it('renders the List with changed style rules', () => {
    const tree = renderer.create(Component({ direction: 'row' })).toJSON()
    expect(tree).toHaveStyleRule('flex-direction', 'row')
  })

  it('render the List with default element prop', () => {
    const component = mount(Component())
    expect(component.prop('element')).toBe('ul')
  })

  it('render the List and set the props', () => {
    const component = mount(Component({ align: 'left' }))
    expect(component.prop('align')).toBe('left')
  })

  it('render the List and the children HTML elements', () => {
    const component = shallow(Component())
    expect(
      component
        .children()
        .first()
        .contains(1)
    ).toBe(true)
  })

  it('render the List and the React children', () => {
    const component = shallow(Component())
    expect(component.children().length).toBe(3)
  })

  it('render simple li with number', () => {
    const component = shallow(Component())
    expect(
      component
        .children()
        .first()
        .html()
    ).toEqual('<li>1</li>')
  })

  it('render item with correct properties', () => {
    const Item = ({ item }) => <li>{item.label}</li>
    const component = shallow(
      <List
        data={[{ label: 'Hello', id: '123' }, { label: 'World', id: '456' }]}
        renderItem={item => <Item key={item.id} item={item} />}
      />
    )
    const child = component.children().first()
    expect(child.text()).toEqual('<Item />')
  })
})
