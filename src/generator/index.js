import styled from 'styled-components'
import { propertiesIterator } from '../utils'

const elementPropsSchemaList = (type, props, theme, breakpoint) => {
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
      const { fonts, sizes, weights, lines, spaces } = theme.typography
      const getDefaultThemeProp = (keyProp, defaultValue) => {
        if (!!Object.keys(keyProp).length && !!keyProp[element])
          return keyProp[element]
        return defaultValue
      }
      const defaultFont = getDefaultThemeProp(fonts, ``)
      const defaultSize = getDefaultThemeProp(sizes, 16)
      const defaultWeight = getDefaultThemeProp(weights, 'normal')
      const defaultLine = getDefaultThemeProp(lines, 1.5)
      const defaultSpace = getDefaultThemeProp(spaces, 0.25)
      return [
        ['font-family', props.font || defaultFont],
        ['font-size', props.size || defaultSize],
        ['font-weight', props.weight || defaultWeight],
        ['letter-spacing', props.space || defaultSpace],
        ['line-height', props.line || defaultLine],
        ['white-space', props.wrap],
        ['text-transform', props.transform],
        ['color', props.color, true, '', 'black'],
        ['display', props.display],
        ['position', props.position],
        ['padding', props.padding],
        ['width', props.width],
        ['height', props.height],
        ['max-width', props.width || props.maxWidth],
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
  const { theme } = props
  const generateStyles = breakpoint =>
    `${propertiesIterator(
      elementPropsSchemaList(type, props, theme, breakpoint),
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
