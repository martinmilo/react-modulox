import React from 'react'
import styled from 'styled-components'
import { injectStyles } from './styles'
import { commonTypes } from '../../types'

const config = require('../../../config')

const Box = ({ children, element, events, ...props }) => {
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
	width: 'auto',
	height: 'auto',
	maxWidth: 'initial',
	maxHeight: 'initial',
	justify: 'initial',
	align: 'initial',
	direction: 'column',
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

export default Box
