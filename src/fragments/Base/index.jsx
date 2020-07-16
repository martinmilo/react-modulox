import React from 'react';
import styled from 'styled-components';
import blueprints from './blueprints';
import { injectCSS } from '../../utils';

const injectCSSFn = injectCSS.bind(null, blueprints);

const Fragment = styled.div`
  ${injectCSSFn}
`;

export default Fragment;
