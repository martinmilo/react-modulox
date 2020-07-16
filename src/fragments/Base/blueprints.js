const blueprints = [
  { key: 'flex', cssKey: 'display', cssValue: 'flex' },
  { key: 'display', defaultValue: 'block' },
  { key: 'direction', cssKey: 'flex-direction' },
  { key: 'margin', appendUnit: true },
  { key: 'padding', appendUnit: true },
  { key: 'width', appendUnit: true },
  { key: 'height', appendUnit: true },
  { key: 'maxWidth', cssKey: 'max-width', appendUnit: true },
  { key: 'maxHeight', cssKey: 'max-height', appendUnit: true },
  { key: 'minWidth', cssKey: 'min-width', appendUnit: true },
  { key: 'minHeight', cssKey: 'min-height', appendUnit: true },
  { key: 'background', themePath: 'colors' },
  { key: 'color', themePath: 'colors' },
  {
    key: 'gapVertical',
    cssKey: 'margin-bottom',
    themePath: 'gaps.vertical',
    appendUnit: true,
  },
  {
    key: 'gapHorizontal',
    cssKey: 'margin-right',
    themePath: 'gaps.horizontal',
    appendUnit: true,
  },
  { key: 'cursor' },
];

export default blueprints;