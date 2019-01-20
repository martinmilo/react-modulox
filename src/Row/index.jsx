import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { injectStyles } from './styles'

const config = require('../../config')

const Row = ({ children, element, events, ...props }) => {
	const Element = styled[element]`
		${injectStyles(props)}
		::after {${props.after}}
		::before {${props.before}}
		:hover {${props.hover}}
		& > * {${props.spacing}}
		${props.style}
	`
  return (
    <Element className={props.className} {...events}>
      {children}
    </Element>
  )
}

Row.propTypes = {
	element: propTypes.string,
	events: propTypes.object,
	display: propTypes.string,
	wrap: propTypes.string,
	position: propTypes.string,
	spacing: propTypes.string,
	padding: propTypes.string,
	width: propTypes.string,
	height: propTypes.string,
	maxWidth: propTypes.string,
	maxHeight: propTypes.string,
	justify: propTypes.string,
	align: propTypes.string,
	background: propTypes.string,
	className: propTypes.string,
	style: propTypes.string,
	hover: propTypes.string,
	before: propTypes.string,
	after: propTypes.string,
}

Row.defaultProps = {
	element: 'div',
	display: 'flex',
	events: {},
	wrap: 'nowrap',
	margin: 'initial',
	position: 'initial',
	padding: 'initial',
	width: 'auto',
	height: 'auto',
	maxWidth: 'initial',
	maxHeight: 'initial',
	justify: 'space-between',
	align: 'center',
	background: 'transparent',
	className: '',
	spacing: '',
	style: '',
	hover: '',
	before: '',
	after: '',
	[config.breakpoints[0].size]: 100,
}

export default Row
