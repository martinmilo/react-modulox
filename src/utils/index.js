export function injectCSS(blueprints, { theme, ...props }) {
  let css = '';
  let cssGaps = '';

  const breakpoints = theme?.breakpoints || null;
  const zeroBreakpointKey = breakpoints
    ? Object.keys(breakpoints)[Object.values(breakpoints).indexOf(0)]
    : null;

  const cssBreakpointsMap = breakpoints
    ? Object.keys(breakpoints).reduce((agg, key) => {
        if (key === zeroBreakpointKey) return agg;
        agg[key] = '';
        return agg;
      }, {})
    : {};

  const cssBrekpointGapsMap = Object.assign({}, cssBreakpointsMap);

  stylesLoop: for (let i = blueprints.length; i--; ) {
    const {
      key,
      cssKey,
      cssValue,
      themePath,
      appendUnit,
      defaultValue,
    } = blueprints[i];

    const cssPropKey = cssKey || key;
    let value = props[key];

    // No value or default value defined, skip this property
    if (!value && !defaultValue) continue;

    // This property is just a shorthand (i.e. assign directly and continue)
    if (value && typeof value === 'boolean') {
      css += `${cssPropKey}: ${cssValue};`;
      continue;
    }

    // This property is using breakpoint styles
    if (/\:\|/.test(value)) {
      if (!breakpoints) continue stylesLoop;

      const breakpointValues = value.split('|');
      for (let j = breakpointValues.length; j--; ) {
        const val = breakpointValues[j];

        if (!val || !/\:/.test(val)) continue;

        const breakpointKey = val.slice(0, -1).trim();

        // Skip if this breakpoint is not defined in theme
        if (typeof breakpoints[breakpointKey] !== 'number') continue;

        let breakpointValue = breakpointValues[j + 1];

        // Breakpoint value that represents the default breakpoint
        if (breakpointKey === zeroBreakpointKey) {
          value = breakpointValue;
          continue;
        }

        // Breakpoint values for media queries
        if (themePath)
          breakpointValue =
            theme?.[themePath]?.[breakpointValue] || breakpointValue;
        else breakpointValue = breakpointValue || defaultValue;

        const breakpointProp = `${cssPropKey}: ${breakpointValue};`;

        if (/gap/.test(key))
          cssBrekpointGapsMap[breakpointKey] += breakpointProp;
        else cssBreakpointsMap[breakpointKey] += breakpointProp;
      }

      // If zero breakpoint key was not defined in theme
      // the css prop with value would appear in the @media queries for the specific breakpoint
      if (!zeroBreakpointKey) continue;
    }

    // Append pixels as unit to the value if type of number and appending is needed
    const appendedValue =
      appendUnit && typeof value === 'number' ? `${value}px` : value;

    if (themePath) value = theme?.[themePath]?.[value] || value;
    else value = appendedValue || defaultValue;

    const prop = `${cssPropKey}: ${value};`;

    if (/gap/.test(key)) cssGaps += prop;
    else css += prop;
  }

  // Append gap styles to the css string if present
  if (cssGaps) css += `> *:not(:last-child) { ${cssGaps} }`;

  // Iterate over breakpoints and append styles to the css string
  const cssBreakpointKeys = Object.keys(cssBreakpointsMap);
  for (let k = cssBreakpointKeys.length; k--; ) {
    const breakpointKey = cssBreakpointKeys[k];

    const breakpointStyles = cssBreakpointsMap[breakpointKey] || '';
    const breakpointGaps = cssBrekpointGapsMap[breakpointKey]
      ? `> *:not(:last-child) { ${cssBrekpointGapsMap[breakpointKey]} }`
      : '';

    if (!breakpointStyles && !breakpointGaps) continue;

    css += `@media (min-width: ${theme.breakpoints[breakpointKey]}px) {${breakpointStyles} ${breakpointGaps}}`;
  }

  // Inject custom styles
  if (props.styles) css += props.styles;

  return css;
}
