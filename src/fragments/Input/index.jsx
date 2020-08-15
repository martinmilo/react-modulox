import React from 'react';
import Fragment from '../Base';
import styled from 'styled-components';
import { injectCSS } from '../../utils';
import blueprints from '../blueprints';

const injectCoreCSSFn = injectCSS.bind(null, blueprints.core);
const injectTextCSSFn = injectCSS.bind(null, blueprints.text);

export const InputFragment = styled.input`
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

const Input = ({
  className,
  name,
  type,
  value,
  placeholder,
  disabled,
  tabIndex,
  autoFocus,
  onChange,
  onBlur,
  onKeyDown,
  ...rest
}) => {
  const handleChange = React.useCallback(
    event => (disabled ? () => undefined : onChange(event.target.value)),
    [onChange]
  );

  return (
    <InputFragment
      className={className}
      id={name}
      name={name}
      type={type}
      value={value}
      tabIndex={tabIndex}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={handleChange}
      onBlur={disabled ? () => undefined : onBlur}
      onKeyDown={disabled ? () => undefined : onKeyDown}
      {...rest}
    />
  );
};

Input.defaultProps = {
  name: '',
  type: 'text',
  value: '',
  className: '',
  placeholder: '',
  autoFocus: false,
  disabled: false,
  tabIndex: null,
  onBlur: () => undefined,
  onKeyDown: () => undefined,
};

export default Input;
