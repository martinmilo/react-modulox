import React from 'react'
import propTypes from 'prop-types'
import { commonTypes } from '../types'
import { styledElement } from '../generator'
import theme from '../../default.theme'

const Text = ({ children, events, ...props }) => {
  const Element = styledElement('Text', props)
  return (
    <Element className={props.className} {...events}>
      {children}
    </Element>
  )
}

Text.propTypes = {
  font: propTypes.string,
  size: propTypes.oneOfType([propTypes.string, propTypes.number]),
  weight: propTypes.oneOfType([propTypes.string, propTypes.number]),
  transform: propTypes.string,
  color: propTypes.string,
  space: propTypes.string,
  ...commonTypes
}

Text.defaultProps = {
  element: 'span',
  display: 'inline',
  font: ``,
  size: ``,
  color: ``,
  weight: ``,
  line: ``,
  space: ``,
  transform: ``,
  wrap: 'normal',
  events: {},
  margin: 'initial',
  position: 'initial',
  padding: 'initial',
  width: ``,
  height: ``,
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

export default Text
