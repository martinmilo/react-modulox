import React from 'react';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCSSFn = injectCSS.bind(null, blueprints.core);

const Fragment = styled.div`
  ${injectCSSFn}
`;

Fragment.displayName = 'Div';

export default Fragment;
