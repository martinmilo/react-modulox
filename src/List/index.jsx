import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { injectStyles } from './styles'

const config = require('../../config')

const List = ({ children, element, items, events, ...props }) => {
	const Element = styled[element]`
		${injectStyles(props)}
		::after {${props.after}}
		::before {${props.before}}
		:hover {${props.hover}}
		& > * {${props.spacing}}
		${props.style}
	`
	const renderChildren = (item, index) => React.isValidElement(children)
		? React.Children.map(children, function(child) {
				const listLength = items.length
				const isLastItem = index === listLength - 1
				const propsToReactChildElement = typeof item === 'object'
					? { ...item }
					: { item }
				return React.cloneElement(child, {
					...propsToReactChildElement,
					listLength,
					isLastItem,
					index,
				})
			})
		: item

  return (
    <Element className={props.className} {...events}>
			{items.length > 0 && items.map(
        (item, index) => renderChildren(item, index)
      )}
    </Element>
  )
}

List.propTypes = {
	items: propTypes.array,
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
	direction: propTypes.string,
	background: propTypes.string,
	className: propTypes.string,
	style: propTypes.string,
	hover: propTypes.string,
	before: propTypes.string,
	after: propTypes.string,
}

List.defaultProps = {
	items: [],
	element: 'ul',
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
	className: '',
	spacing: '',
	style: '',
	hover: '',
	before: '',
	after: '',
	[config.breakpoints[0].size]: 100,
}

export default List
