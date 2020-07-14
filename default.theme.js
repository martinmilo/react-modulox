module.exports = {
  // Define your breakpoints
  // You can define whatever number of breakpoints you want
  // Just keep in mind, that it's mobile-first
	// So the breakpoints are defined with min-width
	breakpoints: {
		m: 0,
		t: 769,
		d: 1200,
		g: 1980
	},
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
      a: "'Roboto', serif",
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
      a: 't:|16px|, m:|16px|, l:|16px|',
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
    },
    lines: {
      h1: 1.35,
      h2: 1.375,
      h3: 1.4,
      h4: 1.45,
      h5: 1.475,
      h6: 1.5,
      p: 1.6,
      a: 1.6,
      li: 1.6,
      span: 1.7,
      small: 1.75
    },
    spaces: {
      h1: 0.25,
      h2: 0.2,
      h3: 0.15,
      h4: 0.1,
      h5: 0.1,
      h6: 0.1,
      p: 0.25,
      a: 0.25,
      li: 0.25,
      span: 0.3,
      small: 0.35
    }
  }
}
