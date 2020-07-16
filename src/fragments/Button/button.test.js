import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../services/theme';
import Button from './';

describe('ButtonFragment', () => {
  it('renders with changed style rules', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree.type).toBe('button');
  });

  it('renders with correct theme properties', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ colors: { blue: 'lightskyblue' } }}>
          <Button background="blue" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('background', 'lightskyblue');
  });

  it('render and the children HTML elements', () => {
    const component = shallow(
      <Button>
        <div className="test">Test</div>
      </Button>
    );
    expect(component.contains(<div className="test">Test</div>)).toBe(true);
  });
});
