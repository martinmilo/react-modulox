// The utilities for building modular components
import config from './config'

/*
// This function convert custom string and returns just a value specific for a breakpoint
*/
export const convertToDeviceValues = (deviceSize, values) => {
	// If the values are string, let's play with them. Just a little
  if (typeof values === 'string') {
		// Here'll be two situations (string with commas, string without commas)
		// If there's comma, there should be breakpoints
		if (values.includes(config.SPLITTER)) {
			const breakpoint = config.BREAKPOINTS.filter(obj => obj.size === deviceSize)[0] || null
			const listOfValues = values.split(config.SPLITTER)

			if (breakpoint !== null) {
				const { prefix } = breakpoint
				const filteredValue = listOfValues.filter((value) => value.includes(prefix))[0] || null

				if (filteredValue !== null) {
					const valueInBrackets = filteredValue.slice(filteredValue.indexOf(prefix) + prefix.length)
					return valueInBrackets.slice(1,-1) // Remove the brackets
				} else {
					return ''
				}
			}
		} else {
			return values
		}
	}
	// If the values are object, we should treat them like array
  else if (typeof values === 'object') {
		return [values]
	}
	// Return values if the values are not object/string, so it will be number
  return values
}


/*
// Return the key needed for media queries for each breakpoint from config
*/
export const omitCustomProps = (themeStyles, customStyles) => {
	for (let property in themeStyles) {
		typeof customStyles[property] !== 'undefined'
			&& delete themeStyles[property]
	}
	return themeStyles
}

/*
// Return the key needed for media queries for each breakpoint from config
*/
export const breakpointKey = (deviceIndex) =>
	[`@media (min-width: ${config.BREAKPOINTS[deviceIndex].minWidth}px)`]


/*
// Return the value specific for the requested breakpoint by it's device index
*/
export const breakpointValue = (deviceIndex, value) => {
	const size = (index) => config.BREAKPOINTS[index].size
	const convertedValue = convertToDeviceValues(size(deviceIndex), value)
	const previousIndex = deviceIndex === 0 ? deviceIndex : deviceIndex - 1
	const previousValue = convertToDeviceValues(size(previousIndex), value)

	// If converted value is not empty
	if (!!convertedValue) {
		// If device index is 0, then we should always return initial value
		if (deviceIndex === 0) {
			return convertedValue
		// If device index is higher than 0, then compare coverted value with previous value
		// Don't return the value if it's the same as before (CSS would override it anyway)
		} else if (previousValue !== convertedValue) {
			return convertedValue
		}
		return null
	}
	return null
}


/*
// Multiple breakpoints value iterator function (when we pass values from theme object)
*/
export const breakpointValuesIterator = (deviceIndex, values, customStyles) => {
	let obj = {}
	Object.entries(values).forEach(([key, value]) => {
		const omitValue = customStyles && customStyles[key]
	  const convertedValue = omitValue || breakpointValue(deviceIndex, value)
	  obj[key] = convertedValue !== null
			? convertedValue
			: String() // Well return an empty string if there's a null value
	})
	return obj
}















// DEPRECATED
// DEPRECATED
// DEPRECATED
export const breakpointSpecificStyle = (deviceIndex, value) => {
	const breakpoints = config.BREAKPOINTS

	return breakpoints.map((obj) => {
		return obj.size === deviceSize
			? {
				flexBasis: `${props[obj.size]}%`,
				...properties.forEach((property) => {
					[Object.keys(property)[0]] = convertToDeviceValues(obj.size, property)
				}),
			}
			: {}
	})
}

export const breakpoint = (device, size, props, index = null) => {
  const addPadding = size === 'xl' || size === 'xt'
    ? { padding: convertToDeviceValues(props.padding, index) }
    : {}

  const addDisplay = typeof props.hideFor !== 'undefined'
    ? { display: hideFor(props.hideFor, size) }
    : {}

  return {
    flexBasis: `${props[size]}%`,
    maxWidth: props.maxWidth !== 'initial'
      ? props.maxWidth
      : `${props[size]}%`,
    ...addDisplay,
    ...addPadding
  }
}

export const hideFor = (devices, size) => {
  if (devices === 'mobiles') {
    return size === 'xs' || size === 'xm' || size === 'xt'
      ? 'none'
      : 'flex'
  } else if (devices === 'desktops') {
    return size === 'xl' || size === 'xp'
      ? 'none'
      : 'flex'
  }
}
