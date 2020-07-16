// Get the CSS maps by breakpoint & the zerothBreakpointKey
// First map will be used to collect all css styles for each breakpoint { m: 'margin...', t: '', d: '', etc. }
// Second map will be used to collect all css gaps for each breakpoint
function getCSSMapsByBreakpoint(breakpoints) {
  if (!breakpoints)
    return {
      zerothBreakpointKey: null,
      cssByBreakpoint: {},
      cssGapsByBreakpoint: {},
    };

  const zerothBreakpointKey = Object.keys(breakpoints)[
    Object.values(breakpoints).indexOf(0)
  ];

  const cssByBreakpoint = Object.keys(breakpoints).reduce((agg, key) => {
    if (key === zerothBreakpointKey) return agg;
    agg[key] = '';
    return agg;
  }, {});

  const cssGapsByBreakpoint = Object.assign({}, cssByBreakpoint);

  return { zerothBreakpointKey, cssByBreakpoint, cssGapsByBreakpoint };
}

// Deep get value from object by string path
function deepGet(object, path) {
  if (!object || !path) return null;

  // If path does not contain dot (.), select value from object directly
  if (!/\./.test(path)) return object[path];

  // Otherwise deeply retrieve the property by spliting the path
  let value = object;
  for (let j = 0, arr = path.split('.'), len = arr.length; j < len; j++) {
    if (!value) break;
    value = value[arr[j]];
  }
  return value;
}

// Generate the css property based on params
// Retrieve the value from theme if present by the path, append value or select the default
function generateCSSProp(
  theme,
  value,
  { key, cssKey, appendUnit, defaultValue, themePath }
) {
  const finalKey = cssKey || key;
  const finalValue =
    // First, try to select the value from theme
    deepGet(theme, themePath)?.[value] ||
    // If appendUnit param is set up, append px to the value
    (appendUnit && typeof value === 'number' ? `${value}px` : value) ||
    // Otherwise set the defaultValue, either from theme or directly
    (/\./.test(defaultValue) ? deepGet(theme, defaultValue) : defaultValue);

  // Finally, return the complete css property with correct key and value
  return `${finalKey}: ${finalValue};`;
}

// Inject CSS function iterates over all the props
// Based on the blueprints passed, we generate css properties
export function injectCSS(blueprints, { theme, ...props }) {
  let css = '',
    cssGaps = '';

  const {
    zerothBreakpointKey,
    cssByBreakpoint,
    cssGapsByBreakpoint,
  } = getCSSMapsByBreakpoint(theme?.breakpoints);

  const generateCSSPropFn = generateCSSProp.bind(null, theme);

  // Main loop starts here
  for (let i = blueprints.length; i--; ) {
    const { key, cssKey, cssValue, themePath, defaultValue } = blueprints[i];

    const cssPropKey = cssKey || key;
    let value = props[key];

    // No value or default value defined, skip this property
    if (!value && !defaultValue) continue;

    // This property is just a shorthand (i.e. assign directly and continue)
    if (value && typeof value === 'boolean') {
      css += `${cssPropKey}: ${cssValue};`;
      continue;
    }

    // Retrieve the theme value or default theme value, so we can check if it's using brekpoint style syntax
    const themeValue =
      deepGet(theme, themePath)?.[value] || deepGet(theme, defaultValue);

    // This property is using breakpoint styles
    if (/\:\|/.test(themeValue || value)) {
      if (!theme?.breakpoints) continue;

      const breakpointValues = (themeValue || value).split('|');
      // We iterate over breakpointValues, which is an array of ['m:', '100px', 'd:', '200px']
      // So we only care about odd values (to get a breakpoint key) & then in that iteration we get the value for it
      for (let j = breakpointValues.length; j--; ) {
        const val = breakpointValues[j];

        // Skip if this is not breakpoint key, or is undefined
        if (!val || !/\:/.test(val)) continue;

        const breakpointKey = val.slice(0, -1).trim(); // Get rid of : from the key

        if (typeof theme.breakpoints[breakpointKey] !== 'number') continue;

        // Retrieve the value for this breakpoint key by accessing the next value from array
        let breakpointValue = breakpointValues[j + 1];

        // Breakpoint value that represents the default breakpoint
        // Therefore assign it's value to value and continue in the main loop
        // In the end, this breakpoint would be omitted since there's no point of using @media queries with min-width: 0px
        if (breakpointKey === zerothBreakpointKey) {
          value = breakpointValue;
          continue;
        }

        // Generated css property for specific breakpoint
        const breakpointProp = generateCSSPropFn(
          breakpointValue,
          blueprints[i]
        );

        if (/gap/.test(key))
          cssGapsByBreakpoint[breakpointKey] += breakpointProp;
        else cssByBreakpoint[breakpointKey] += breakpointProp;
      }

      // If zero breakpoint key was not defined in theme
      // the css prop with value would appear in the @media queries for the specific breakpoint
      if (!zerothBreakpointKey) continue;
    }

    // Generated css property
    const cssProperty = generateCSSPropFn(value, blueprints[i]);

    // Append generated property to the correct variable (either regular css style or a gap)
    if (/gap/.test(key)) cssGaps += cssProperty;
    else css += cssProperty;
  }

  // Append gap styles to the end of css string if present
  if (cssGaps) css += `> *:not(:last-child) { ${cssGaps} }`;

  // Iterate over breakpoints and append styles to the css string
  const cssBreakpointKeys = Object.keys(cssByBreakpoint);
  for (let k = cssBreakpointKeys.length; k--; ) {
    const breakpointKey = cssBreakpointKeys[k];

    const breakpointStyles = cssByBreakpoint[breakpointKey] || '';
    const breakpointGaps = cssGapsByBreakpoint[breakpointKey]
      ? `> *:not(:last-child) { ${cssGapsByBreakpoint[breakpointKey]} }`
      : '';

    if (!breakpointStyles && !breakpointGaps) continue;

    css += `@media (min-width: ${theme.breakpoints[breakpointKey]}px) {${
      breakpointStyles ? ` ${breakpointStyles} ` : ''
    }${breakpointGaps ? ` ${breakpointGaps} ` : ''}}`;
  }

  // Inject custom styles at the end of the css string if present
  if (props.styles) css += props.styles;

  return css;
}
