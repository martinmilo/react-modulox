module.exports = {
  // Core blueprints
  core: [
    { key: 'row', cssProp: 'display: flex; flex-direction: row;' },
    { key: 'column', cssProp: 'display: flex; flex-direction: column;' },
    { key: 'hidden', cssKey: 'display', cssValue: 'none' },
    { key: 'display' },
    { key: 'direction', cssKey: 'flex-direction' },
    { key: 'align', cssKey: 'align-items' },
    { key: 'justify', cssKey: 'justify-content' },
    { key: 'margin', appendUnit: 'px' },
    { key: 'padding', appendUnit: 'px' },
    { key: 'width', appendUnit: 'px' },
    { key: 'height', appendUnit: 'px' },
    { key: 'maxWidth', cssKey: 'max-width', appendUnit: 'px' },
    { key: 'maxHeight', cssKey: 'max-height', appendUnit: 'px' },
    { key: 'minWidth', cssKey: 'min-width', appendUnit: 'px' },
    { key: 'minHeight', cssKey: 'min-height', appendUnit: 'px' },
    { key: 'background', themeValuePath: 'colors' },
    { key: 'color', themeValuePath: 'colors' },
    { key: 'position' },
    { key: 'cursor' },
    {
      key: 'gapVertical',
      cssKey: 'margin-bottom',
      themeValuePath: 'gaps.vertical',
      appendUnit: 'px',
    },
    {
      key: 'gapHorizontal',
      cssKey: 'margin-right',
      themeValuePath: 'gaps.horizontal',
      appendUnit: 'px',
    },
  ],
  // Text extension blueprints
  text: [
    {
      key: 'font',
      cssKey: 'font-family',
      themeValuePath: 'typography.fontFamilies',
      defaultValuePath: 'typography.defaultFontFamily',
      defaultValueFallback: 'inherit',
    },
    {
      key: 'size',
      cssKey: 'font-size',
      appendUnit: 'px',
      themeValuePath: 'typography.fontSizes',
      defaultValuePath: 'typography.defaultFontSize',
      defaultValueFallback: '100%',
    },
    { key: 'weight', cssKey: 'font-weight' },
    { key: 'space', cssKey: 'white-space' },
    { key: 'uppercase', cssKey: 'text-transform', cssValue: 'uppercase' },
    { key: 'underline', cssKey: 'text-decoration', cssValue: 'underline' },
    { key: 'center', cssKey: 'text-align', cssValue: 'center' },
    { key: 'block', cssKey: 'display', cssValue: 'block' },
    { key: 'letterSpacing', cssKey: 'letter-spacing', appendUnit: 'px' },
    { key: 'lineHeight', cssKey: 'line-height' },
  ],
};
