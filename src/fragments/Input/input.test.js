import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from './';

describe('when input is enabled', () => {
  const input = mount(<Input onChange={jest.fn()} />);

  it('should render input element', () => {
    expect(input.find('input').exists()).toBe(true);
  });

  it('should call the onChange when changing the value', () => {
    input.simulate('change', { target: { value: 'Changed value' } });
    expect(input.prop('onChange')).toHaveBeenCalledWith('Changed value');
  });
});

describe('when input is disabled', () => {
  const input = mount(<Input onChange={jest.fn()} disabled />);

  it('should not call onChange', () => {
    input.simulate('change', { target: { value: 'Changed value' } });
    expect(input.prop('onChange')).toHaveBeenCalledTimes(0);
  });
});
