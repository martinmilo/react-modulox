import React from 'react';
import Fragment from '../Base';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCoreCSSFn = injectCSS.bind(null, blueprints.core);
const injectTextCSSFn = injectCSS.bind(null, blueprints.text);

export const TextFragment = styled.span`
	font-size: 100%;
  font-family: inherit;

  ${injectCoreCSSFn}
	${injectTextCSSFn}
`;

const Text = TextFragment;

Text.displayName = 'Text';

export default Text;
