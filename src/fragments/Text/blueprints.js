const blueprints = [
  {
    key: 'font',
    cssKey: 'font-family',
		themePath: 'typography.fontFamilies',
    defaultValue: 'typography.defaultFontFamily',
  },
  { key: 'block', cssKey: 'display', cssValue: 'block' },
  { key: 'uppercase', cssKey: 'text-transform', cssValue: 'uppercase' },
  { key: 'underline', cssKey: 'text-decoration', cssValue: 'underline' },
  {
    key: 'size',
    cssKey: 'font-size',
    themePath: 'typography.fontSizes',
		appendUnit: true,
		defaultValue: 'typography.defaultFontSize',
  },
  { key: 'weight', cssKey: 'font-weight' },
  { key: 'space', cssKey: 'white-space' },
  { key: 'letterSpacing', cssKey: 'letter-spacing', appendUnit: true },
  { key: 'lineHeight', cssKey: 'line-height' },
];

export default blueprints;
