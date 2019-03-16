import React from 'react'
import { commonTypes } from '../types'
import { styledElement } from '../generator'

const Box = ({ children, events, ...props }) => {
  const Element = styledElement('Box', props)
  return (
    <Element className={props.className} {...events}>
      {children}
    </Element>
  )
}

Box.propTypes = {
  ...commonTypes
}

Box.defaultProps = {
  element: 'div',
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
  childs: ``
}

export default Box
