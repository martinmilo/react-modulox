import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../services/theme';
import Fragment from './';

describe('BaseFragment', () => {
  it('renders correct styles from shorthand', () => {
    const tree = renderer.create(<Fragment row />).toJSON();
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-direction', 'row');
  });

  it('render and set the props', () => {
    const component = mount(<Fragment align="left" />);
    expect(component.first().prop('align')).toBe('left');
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

  it('render and the children HTML elements', () => {
    const component = shallow(
      <Fragment>
        <div className="test">Test</div>
      </Fragment>
    );
    expect(component.contains(<div className="test">Test</div>)).toBe(true);
  });

  describe('when using different themes', () => {
    it('renders correct background for default theme', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={{
            default: true,
            colors: { red: 'fire', blue: 'ice' }
          }}>
            <Fragment background="red|blue" />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toHaveStyleRule('background', 'fire');
    });

    it('renders correct background for non-default theme', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={{
            default: false,
            colors: { red: 'fire', blue: 'ice' }
          }}>
            <Fragment background="red|blue" />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toHaveStyleRule('background', 'ice');
    });
  })
});
