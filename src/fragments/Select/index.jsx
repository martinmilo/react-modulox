import React from 'react';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCoreCSSFn = injectCSS.bind(null, blueprints.core);
const injectTextCSSFn = injectCSS.bind(null, blueprints.text);

export const SelectFragment = styled.select`
  font-size: 100%;
  font-family: inherit;
  width: 100%;
  padding: 10px 11px;
  border-radius: 4px;
  box-shadow: none;
  border: unset;
  resize: none;

  ${injectCoreCSSFn}
  ${injectTextCSSFn}
`;

const Select = ({
  className,
  options,
  name,
  value,
  disabled,
  onChange,
  ...rest
}) => {
  const handleChange = React.useCallback(
    event => (disabled ? undefined : onChange(event.target.value)),
    [onChange]
  );

  const selected = options.find(option => option.value === value);

  return (
    <SelectFragment
      className={className}
      id={name}
      name={name}
      value={value}
      disabled={disabled}
      padding={disabled ? '0 0.75em 0 0' : ''}
      onChange={handleChange}
      {...rest}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectFragment>
  );
};

Select.defaultProps = {
  name: '',
  value: '',
  disabled: false,
};

export default Select;
