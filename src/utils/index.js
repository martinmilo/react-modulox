const config = require('../../config')

const { splitter, breakpoints } = config

/* ----------------------------------------------------------
	Function: propertiesIterator(@properties, @breakpoints)
		@properties: one item is equal to one line of css code
		@breakpoints: needed for media queries, this is object
	Description:
		Iterates over properties and generates the css style code
		as string for each item of the properties.
*/
export const propertiesIterator = (properties, breakpoint) => {
	// We should map all the properties and generate style strings
	return properties.map(p =>
		propertyGenerator(
			p[0], // Key
			p[1], // Value
			p[2], // Media (should we use this style for other breakpoints?)
			p[3], // Unit of the property
			p[4], // Default value
			breakpoint, // Breakpoint object
		)
	).join('')
}

/* ----------------------------------------------------------
	Function: propertyGenerator(@key, @value, @media, @unit, @defaultValue, @breakpoint)
		@key: name of the css property
		@value: value of the css property
		@media: boolean to determine if we have to generate media queries
		@unit: px, em, % (we should add only if we pass number here)
		@defaultValue: fallback value
		@breakpoint: object representing breakpoints config
	Description:
		Generates css string for given property parameters.
*/
export const propertyGenerator = (
	key,
	value,
	media = true,
	unit = '',
	defaultValue = '',
	breakpoint
) => {
	// Check if we should consider media queries
	if (media) {
		// If value contains splitter, then call the breakpoints style function
		// Value can't be number, otherwise it's just a value for single css line
		if (typeof value !== 'number' && value.includes(splitter)) {
			return breakpointStyle(key, value, breakpoint, unit)
		}
		// But if the value does not contain splitter, then generate only one style
		return breakpoints[0].size === breakpoint.size
			? `${key}: ${(value || defaultValue)}${unit};`
			: ``
	}
	// If the value or defaultValue is not undefined, generate style
	if (value || defaultValue) {
		return `${key}: ${(value || defaultValue)}${unit};`
	}
	// Otherwise, just return an empty string
	return ``
}

/* ----------------------------------------------------------
	Function: breakpointStyle(@breakpoint, @valuesInString)
		@key: name of the css property
		@valuesInString: values encoded in string by custom keys
		@breakpoint: specific breakpoint parameters
		@unit: unit of the css property
	Description:
		Destructure the valuesInString and generate css string code
		for each breakpoint given by user.
*/
export const breakpointStyle = (key, valuesInString, breakpoint, unit) => {
	const stylesList = valuesInString.split(splitter)
	if (breakpoint) {
		const { prefix } = breakpoint
		const value = stylesList.filter(value => value.includes(prefix))[0] || null
		if (value) {
			const valueInBrackets = value.slice(value.indexOf(prefix) + prefix.length)
			return `${key}: ${(valueInBrackets.slice(1,-1))}${unit};`
		}
		return ``
	}
	return ``
}
