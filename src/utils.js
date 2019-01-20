const config = require('../config')

const { splitter, breakpoints } = config

export const propertiesIterator = (properties, breakpoint) => {
	// We should map all the properties and generate style strings
	return properties.map(p =>
		property(
			p[0], // Key
			p[1], // Value
			breakpoint, // Breakpoint object
			p[2], // Media (should we use this style for other breakpoints?)
			p[3], // Unit of the property
			p[4] // Default value
		)
	).join('')
}

export const property = (
	key,
	value,
	breakpoint,
	media = true,
	unit = '',
	defaultValue = ''
) => {
	// Check if we should consider media queries
	if (media) {
		// If value contains splitter, then call the breakpoints style function
		if (value.includes(splitter)) {
			return `${key}: ${breakpointStyle(breakpoint, value || defaultValue)}${unit};`
		}
		// But if the value does not contain splitter, then generate only one style
		return breakpoints[0].size === breakpoint.size
			? `${key}: ${(value || defaultValue)}${unit};`
			: ``
	}
	// If the value is not undefined, generate style
	if (value) {
		return `${key}: ${(value || defaultValue)}${unit};`
	}
	// Otherwise, just return an empty string
	return ``
}

export const breakpointStyle = (breakpoint, style) => {
	if (style && style.includes(splitter)) {
		const stylesList = style.split(splitter)
		if (breakpoint) {
			const { prefix } = breakpoint
			const value = stylesList.filter(value => value.includes(prefix))[0] || null
			if (value) {
				const valueInBrackets = value.slice(value.indexOf(prefix) + prefix.length)
				return valueInBrackets.slice(1,-1)
			}
			return null
		}
		return null
	}
	return style
}
