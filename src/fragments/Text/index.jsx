import React from 'react';
import Fragment from '../Base';
import styled from 'styled-components';
import blueprints from './blueprints.json';
import { injectCSS } from '../../utils';

const injectCSSFn = injectCSS.bind(null, blueprints);

export const TextFragment = styled(Fragment)`
  ${injectCSSFn}
`;

const Text = ({ as, ...props }) => (
  <TextFragment as={as || 'span'} {...props} />
);

export default Text;
