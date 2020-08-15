import React from 'react';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCoreCSSFn = injectCSS.bind(null, blueprints.core);
const injectTextCSSFn = injectCSS.bind(null, blueprints.text);

const CheckboxFragment = styled.input`
  box-shadow: none;
  border: unset;
  resize: none;

  ${injectCoreCSSFn}
  ${injectTextCSSFn}
`;

const Checkbox = ({ className, name, value, disabled, onChange, ...rest }) => {
  const handleChange = React.useCallback(
    event => (disabled ? () => undefined : onChange(event.target.checked)),
    [onChange]
  );

  return (
    <CheckboxFragment
      className={className}
      type="checkbox"
      id={name}
      name={name}
      value={value}
      checked={value}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    />
  );
};

Checkbox.defaultProps = {
  name: '',
  value: '',
  disabled: false,
};

export default Checkbox;
