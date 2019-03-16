import React from 'react'
import { commonTypes } from '../types'
import { styledElement } from '../generator'

const Row = ({ children, events, ...props }) => {
  const Element = styledElement('Row', props)
  return (
    <Element className={props.className} {...events}>
      {children}
    </Element>
  )
}

Row.propTypes = {
  ...commonTypes
}

Row.defaultProps = {
  element: 'div',
  display: 'flex',
  events: {},
  wrap: 'initial',
  direction: 'row',
  margin: 'initial',
  position: 'initial',
  padding: 'initial',
  width: ``,
  height: ``,
  justify: 'space-between',
  align: 'center',
  background: 'transparent',
  overflow: ``,
  transition: ``,
  className: ``,
  spacing: ``,
  style: ``,
  hover: ``,
  before: ``,
  after: ``,
  childs: ``
}

export default Row
