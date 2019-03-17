// Iterate through the properties
export const propertiesIterator = (properties, breakpoint, theme) =>
  properties
    .map(property => {
      const key = property[0] // Name of the css style property (width, flex-basis...)
      const value = property[1] // Value of the css property
      const includeMediaQueries = property[2] // Default true
      const unitForValue = property[3] // Default pixels (px)
      const defaultValue = property[4]
      // We should map all the properties and generate style strings
      return propertyGenerator(
        key,
        value,
        includeMediaQueries,
        unitForValue,
        defaultValue,
        breakpoint, // Breakpoint object
        theme // Theme provided by user or default one
      )
    })
    .join('')

// Generate style property
export const propertyGenerator = (
  key,
  value,
  includeMediaQueries = true,
  unitForValue = ``,
  defaultValue = ``,
  breakpoint,
  theme
) => {
  const val = getFinalValue(key, value, defaultValue, theme)
  const unit = getFinalUnit(key, val, unitForValue)
  const cssStyleString = () => `${key}: ${val}${unit};`
  // Check if we should consider includeMediaQueries queries
  if (includeMediaQueries && val) {
    // If value contains splitter, then call the breakpoints style function
    // Value can't be number, otherwise it's just a value for single css line
    if (typeof val !== 'number' && val.includes(theme.splitter)) {
      return key !== 'font-family'
        ? breakpointStyle(key, val, breakpoint, theme)
        : cssStyleString()
    }
    if (typeof val === 'number') return cssStyleString()
    // But if the value does not contain splitter, then generate only one style
    return theme.breakpoints[0].size === breakpoint.size ? cssStyleString() : ``
  }
  if (val) return cssStyleString()
  // Return empty string if undefined
  return ``
}

// Generate breakpoints style
export const breakpointStyle = (key, valuesInString, breakpoint, theme) => {
  const stylesList = valuesInString.split(theme.splitter)

  // Return empty string if the breakpoint is undefined
  if (!breakpoint) return ``

  // Set the prefix from breakpoint and get the value
  const { prefix } = breakpoint
  const value = stylesList.filter(value => value.includes(prefix))[0] || null

  if (value) {
    const valueInBrackets = value.slice(value.indexOf(prefix) + prefix.length)
    return `${key}: ${valueInBrackets.slice(1, -1)};`
  }
  return ``
}

// Get final value
function getFinalValue(key, value, defaultValue, theme) {
  const val = value || defaultValue
  if (key === 'color' || key === 'background') {
    const { colors } = theme
    if (Object.keys(colors).length > 0 && !!colors[value]) return colors[value]
    return val
  } else {
    return val
  }
}

// Get final unit
function getFinalUnit(key, value, unit) {
  if (typeof value === 'number') {
    if (key === 'flex-basis' || key === 'font-weight' || key === 'line-height')
      return unit
    return `px`
  }
  return unit
}
