import React from 'react'
import styled from 'styled-components'
import { injectStyles } from './styles'
import { commonTypes } from '../../types'

const config = require('../../../config')

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
	...commonTypes
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
	transition: '',
	className: '',
	spacing: '',
	style: '',
	hover: '',
	before: '',
	after: '',
	[config.breakpoints[0].size]: 100,
}

export default Row
