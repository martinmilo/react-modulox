import { propertiesIterator } from '../../utils/'

export const injectStyles = props => {
	const { theme } = props
	const styles = breakpoint => `
		${propertiesIterator([
			['flex-basis', props[breakpoint.size], false, '%'],
			['display', props.display],
			['position', props.position],
			['padding', props.padding],
			['width', props.width],
			['height', props.height],
			['max-width', props.maxWidth, true, `${props[breakpoint.size]}%`],
			['max-height', props.maxHeight, true, `${props[breakpoint.size]}%`],
			['background', props.background],
			['margin', props.margin],
			['flex-direction', props.direction],
			['flex-wrap', props.wrap],
			['justify-content', props.justify],
			['align-items', props.align],
		], breakpoint, theme)}
	`

	return theme.breakpoints.map((breakpoint, index) => {
		if (index === 0) {
			return `${styles(breakpoint)}`;
		}
		return `
			@media (min-width: ${breakpoint.minWidth}px) {
				${styles(breakpoint)}
			}
		`;
	}).join('')
}
