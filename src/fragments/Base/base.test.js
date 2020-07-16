import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../services/theme';
import Fragment from './';

describe('BaseFragment', () => {
  it('renders with initial style rules', () => {
    const tree = renderer.create(<Fragment />).toJSON();
    expect(tree).toHaveStyleRule('display', 'block');
  });

  it('renders with correct style properties from theme', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ colors: { red: 'wine' } }}>
          <Fragment width={200} background="red" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('width', '200px');
    expect(tree).toHaveStyleRule('background', 'wine');
  });

  it('renders with proper style properties', () => {
    const tree = renderer.create(<Fragment flex />).toJSON();
    expect(tree).toHaveStyleRule('display', 'flex');
  });

  it('render and set the props', () => {
    const component = mount(<Fragment align="left" />);
    expect(component.first().prop('align')).toBe('left');
  });

  it('render and the children HTML elements', () => {
    const component = shallow(
      <Fragment>
        <div className="test">Test</div>
      </Fragment>
    );
    expect(component.contains(<div className="test">Test</div>)).toBe(true);
  });
});
