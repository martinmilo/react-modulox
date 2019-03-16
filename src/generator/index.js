import styled from 'styled-components'
import { propertiesIterator } from '../utils'
import { getThemePath } from '../utils'

const theme = require(getThemePath())

const elementPropsSchemaList = (type, props, breakpoint) => {
  switch (type) {
    case 'Box':
    case 'Row':
    case 'List':
      const flexBase =
        breakpoint.minWidth === 0 ? props[breakpoint.size] || 100 : undefined
      return [
        ['flex-basis', flexBase, false, '%'],
        ['display', props.display],
        ['position', props.position],
        ['padding', props.padding],
        ['width', props.width],
        ['height', props.height],
        ['max-width', props.width || props.maxWidth, true, '', `${flexBase}%`],
        ['max-height', props.height || props.maxHeight],
        ['background', props.background],
        ['margin', props.margin],
        ['flex-direction', props.direction],
        ['flex-wrap', props.wrap],
        ['justify-content', props.justify],
        ['align-items', props.align],
        ['transition', props.transition],
        ['overflow', props.overflow]
      ]
    case 'Text':
      const { element } = props
      const { fonts, sizes, weights } = theme.typography
      const isDefined = themeProperty =>
        !!Object.keys(themeProperty).length && !!themeProperty[element]
      const defaultFont = isDefined(fonts) ? fonts[element] : ``
      const defaultSize = isDefined(sizes) ? sizes[element] : 16
      const defaultWeight = isDefined(weights) ? weights[element] : 'normal'
      return [
        ['font-family', props.font || defaultFont],
        ['font-size', props.size || defaultSize],
        ['font-weight', props.weight || defaultWeight],
        ['text-transform', props.transform],
        ['white-space', props.space],
        ['color', props.color, true, '', 'black'],
        ['display', props.display],
        ['position', props.position],
        ['padding', props.padding],
        ['width', props.width],
        ['height', props.height],
        ['max-width', props.width || props.maxWidth, true, '', `${flexBase}%`],
        ['max-height', props.height || props.maxHeight],
        ['background', props.background],
        ['margin', props.margin],
        ['transition', props.transition],
        ['overflow', props.overflow]
      ]
    default:
      return
  }
}

const injectStyles = (type, props) => {
  const generateStyles = breakpoint =>
    `${propertiesIterator(
      elementPropsSchemaList(type, props, breakpoint),
      breakpoint,
      theme
    )}`

  return theme.breakpoints
    .map((breakpoint, index) => {
      if (index === 0) {
        return `${generateStyles(breakpoint)}`
      }
      return `@media (min-width: ${breakpoint.minWidth}px) {
				${generateStyles(breakpoint)}
			}
		`
    })
    .join('')
}

export const styledElement = (type, props) => styled[props.element]`
  ${injectStyles(type, props)}
  ::after {
    ${props.after}
  }
  ::before {
    ${props.before}
  }
  :hover {
    ${props.hover}
  }
  & > * {
    margin: ${props.spacing};
    ${props.childs}
  }
  ${props.style}
`
