import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../services/theme';
import Select from './';

const options = [
  { value: '123', label: 'A' },
  { value: '789', label: 'B' },
];

describe('when select is enabled', () => {
  const component = mount(
    <ThemeProvider>
      <Select options={options} onChange={jest.fn()} />
    </ThemeProvider>
	);
	const select = component.find('Select');

  it('should render select element', () => {
    expect(select.find('select').exists()).toBe(true);
	});
	
	it('should render 2 options', () => {
		expect(select.find('option')).toHaveLength(2);
	})

  it('should call the onChange when changing the value', () => {
    select.prop('onChange')('123');
    expect(select.prop('onChange')).toHaveBeenCalledWith('123');
  });
});
