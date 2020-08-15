import React from 'react';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCoreCSSFn = injectCSS.bind(null, blueprints.core);
const injectTextCSSFn = injectCSS.bind(null, blueprints.text);

export const ButtonFragment = styled.button`
  font-size: 100%;
  font-family: inherit;
  margin: 0;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${injectCoreCSSFn}
  ${injectTextCSSFn}
`;

const Button = ButtonFragment;

Button.displayName = 'Button';

export default Button;
