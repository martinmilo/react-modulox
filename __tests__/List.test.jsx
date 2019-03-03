import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import List from '../src/components/List'

describe('List with different render methods', () => {
  it('renders the List with initial style rules', () => {
    const tree = renderer.create(<List items={[1, 2, 3]} />).toJSON()
    expect(tree).toHaveStyleRule('flex-basis', '100%')
    expect(tree).toHaveStyleRule('flex-direction', 'column')
  })

  it('renders the List with changed style rules', () => {
    const tree = renderer.create(<List items={[1, 2, 3]} direction="row" />).toJSON()
    expect(tree).toHaveStyleRule('flex-direction', 'row')
  })

  it('render the List with default element prop', () => {
    const component = mount(<List />)
    expect(component.prop('element')).toBe('ul')
  })

  it('render the List and set the props', () => {
    const component = mount(<List align="left" />)
    expect(component.prop('align')).toBe('left')
  })

  it('render the List and the children HTML elements', () => {
    const component = shallow(<List items={[1, 2, 3]} />)
    expect(component.contains(1)).toBe(true)
  })

  it('render the List and the React children', () => {
    const Item = props => <li>{props.item}</li>
    const component = shallow(
      <List items={[1, 2, 3]}>
        <Item key={Math.random()} />
      </List>
    )
    expect(component.children().length).toBe(3)
  })

  it('render simple li with number', () => {
    const component = shallow(<List items={[1, 2, 3]} />)
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
      <List items={[{ label: 'Hello', id: '123' }, { label: 'World', id: '456' }]}>
        <Item />
      </List>
    )
    expect(
      component
        .children()
        .first()
        .prop('item')
    ).toEqual({ label: 'Hello', id: '123' })
  })
})
