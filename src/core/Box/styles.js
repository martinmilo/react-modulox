import { breakpointKey, breakpointValue } from '../../utils'
import config from '../../config'

export const styles = () => {
	const breakpoints = config.BREAKPOINTS
	const box = {}

	breakpoints.map((obj, index) => {
		box[breakpointKey(index)] = {
			box: {
				extend: props => ({
					flexBasis: `${props[obj.size]}%`,
					display: breakpointValue(index, props.display),
					position: breakpointValue(index, props.position),
					padding: breakpointValue(index, props.padding),
					height: breakpointValue(index, props.height),
					maxWidth: breakpointValue(index, props.maxWidth || `${props[obj.size]}%`),
					background: breakpointValue(index, props.bgColor),
					margin: props.center ? '0 auto' : '',
					flexWrap: props.wrap ? 'wrap' : 'nowrap',
					justifyContent: props.center ? 'center' : breakpointValue(index, props.justify),
					alignItems: props.center ? 'center' : breakpointValue(index, props.align),
					flexDirection: props.reverse
						? `${breakpointValue(index, props.direction)}-reverse`
						: `${breakpointValue(index, props.direction)}`,
					...props.style,
				}),
				'&:hover': {
					extend: props => ({
						...props.hoverStyle,
					})
				},
				'& > *': {
					extend: props => ({
						margin: breakpointValue(index, props.spacing)
					})
				}
			},
		}
	})

	return box
}
