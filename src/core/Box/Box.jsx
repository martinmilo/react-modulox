import React from 'react'
import propTypes from 'prop-types'
import injectSheet from 'react-jss'
import { styles } from './styles'
import config from '../../config'

const Box = ({ classes, children, events, ...props }) => {
  const Element = `${props.element}`

  return (
    <Element className={`
      ${classes.box}
      ${props.className}
    `} {...events}>
      {children}
    </Element>
  )
}

/**
 * Specific properties for this Component
 *
 * @param element - Type of the element
 * @param events - Attached event events
 */

Box.propTypes = {
	element: propTypes.string,
	events: propTypes.object,
	display: propTypes.string,
	wrap: propTypes.bool,
	center: propTypes.bool,
	position: propTypes.string,
	spacing: propTypes.oneOfType([ propTypes.array, propTypes.string, propTypes.number ]),
	padding: propTypes.oneOfType([ propTypes.array, propTypes.string, propTypes.number ]),
	height: propTypes.oneOfType([ propTypes.number, propTypes.string ]),
	maxWidth: propTypes.oneOfType([ propTypes.number, propTypes.string ]),
	justify: propTypes.string,
	align: propTypes.string,
	reverse: propTypes.bool,
	direction: propTypes.string,
	bgColor: propTypes.string,
	className: propTypes.string,
	style: propTypes.object,
	hoverStyle: propTypes.object,
}

const smallest = config.BREAKPOINTS[0].size

Box.defaultProps = {
	element: 'div',
	display: 'flex',
	events: {},
	wrap: false,
	center: false,
	position: 'relative',
	spacing: 'initial',
	padding: 'initial',
	height: 'auto',
	maxWidth: 'initial',
	justify: 'initial',
	align: 'initial',
	reverse: false,
	direction: 'initial',
	bgColor: 'transparent',
	className: '',
	style: {},
	hoverStyle: {},
	[smallest]: 100,
}

export default injectSheet(styles)(Box)
