import React from 'react'
import propTypes from 'prop-types'
import { commonTypes } from '../types'
import { styledElement } from '../generator'
import theme from '../../default.theme'

const List = ({ renderItem, data, events, ...props }) => {
  const Element = styledElement('List', props)
  return (
    <Element className={props.className} {...events}>
      {data && data.length > 0 && data.map((item, index) => renderItem(item, index))}
    </Element>
  )
}

List.propTypes = {
  data: propTypes.array.isRequired,
  renderItem: propTypes.func.isRequired,
  ...commonTypes
}

List.defaultProps = {
  data: [],
  element: 'ul',
  display: 'flex',
  events: {},
  wrap: 'nowrap',
  margin: 'initial',
  position: 'initial',
  padding: 'initial',
  width: ``,
  height: ``,
  justify: 'initial',
  align: 'initial',
  direction: 'column',
  background: 'transparent',
  overflow: ``,
  transition: ``,
  className: ``,
  spacing: ``,
  style: ``,
  hover: ``,
  before: ``,
  after: ``,
  childs: ``,
  theme
}

export default List
