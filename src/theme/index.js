const theme = {
  // Define your breakpoints
  // You can define whatever number of breakpoints you want
  // Just keep in mind, that it's mobile-first
  // So the breakpoints are defined with min-width
  breakpoints: [
    { size: `xt`, prefix: `t:`, minWidth: 0 },
    { size: `xs`, prefix: `s:`, minWidth: 565 },
    { size: `xm`, prefix: `m:`, minWidth: 769 },
    { size: `xl`, prefix: `l:`, minWidth: 1200 },
    { size: `xg`, prefix: `g:`, minWidth: 1980 }
  ],
  // Splitter, that will split the multiple values for different breakpoints
  // For example color={`t:|red|, s:|blue|, m:|green|`}
  // ModuloX will handle splitting up this values and generate correct media queries
  splitter: `,`,
  // Colors defined by you for your amazing project!
  // Just pass string representing the color and you'll get what you defined here!
  // Example: <Box background="red" /> will generate div with '#d41111' as background
  colors: {
    red: '#d41111',
    blue: '#add8e6',
    green: '#228B22'
  },
  // Typography has always been a painful, not anymore!
  // Seems like a lot of typing here, but you have all flexibility you wish you had before!
  typography: {
    // Fonts defined for each element
    // Keep in mind, that you have to install the fonts first to use it!
    // You can override this font by passing 'font' prop into Text
    // Example: <Text font="'Open Sans'" /> will override theme font for this component
    // Note: You can't use breakpoints syntax for font-family!
    fonts: {
      h1: "'Playfair Display', sans-serif",
      h2: "'Playfair Display', sans-serif",
      h3: "'Playfair Display', sans-serif",
      h4: "'Playfair Display', sans-serif",
      h5: "'Playfair Display', sans-serif",
      h6: "'Playfair Display', sans-serif",
      p: "'Roboto', serif",
      li: "'Roboto', serif",
      span: "'Roboto', serif",
      small: "'Roboto', serif"
    },
    // Font sizes for all kinds of screen sizes
    sizes: {
      h1: 't:|24px|, m:|36px|, l:|42px|',
      h2: 't:|21px|, m:|32px|, l:|38px|',
      h3: 't:|19px|, m:|28px|, l:|34px|',
      h4: 't:|18px|, m:|26px|, l:|31px|',
      h5: 't:|17px|, m:|22px|, l:|26px|',
      h6: 't:|16px|, m:|19px|, l:|22px|',
      p: 't:|16px|, m:|16px|, l:|16px|',
      li: 't:|16px|, m:|16px|, l:|16px|',
      span: 't:|15px|, m:|15px|, l:|15px|',
      small: 't:|12px|, m:|12px|, l:|12px|'
    },
    // Go on, redefine or add your own font-weight properties
    // By the way, default font-weight is normal
    weights: {
      h1: 't:|900|, m:|900|, l:|900|',
      h2: 't:|900|, m:|900|, l:|900|',
      h3: 't:|700|, m:|700|, l:|700|'
    }
  }
}

// If you define your own theme, don't forget to keep the structure as it is defined here!
export default theme
