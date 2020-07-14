import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../theme';
import List from './';

describe('ListFragment', () => {
  it('renders with changed style rules', () => {
    const tree = renderer
      .create(<List background="grey" padding={20} />)
      .toJSON();
    expect(tree).toHaveStyleRule('background', 'grey');
    expect(tree).toHaveStyleRule('padding', '20px');
  });

  it('renders with correct theme properties', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ colors: { grey: 'black' } }}>
          <List background="grey" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('background', 'black');
  });

  describe('when passing down empty data', () => {
    [[], {}, undefined, null, false].forEach(type => {
      const label = do {
        if (!type) return type;
        if (type.constructor === Array) return 'empty array';
        return 'empty object';
      };

      it(`as ${label} should still render empty list`, () => {
        const component = mount(
          <List data={[]} children={item => <span>{item}</span>} />
        );
        expect(component.isEmptyRender()).toBe(false);
      });
    });
  });

  describe('when passing down correct data children that is not a function', () => {
    it('should render empty list', () => {
      const component = mount(
        <List data={[1, 2, 3]} children={<span>Item</span>} />
      );
      expect(component.isEmptyRender()).toBe(false);
    });
  });

  describe('when passing down correct data with children as callback', () => {
    [[1, 2, 3], { one: 1, two: 2, three: 3 }].forEach(data => {
      const label = data.constructor === Array ? 'array' : 'object';

      it(`as ${label} should render list with correct data`, () => {
        const component = mount(
          <List
            data={[1, 2, 3]}
            children={item => <span key={item}>{item}</span>}
          />
				);
				expect(component.contains(<span>{1}</span>)).toBe(true);
				expect(component.contains(<span>{2}</span>)).toBe(true);
				expect(component.contains(<span>{3}</span>)).toBe(true);
      });
    });
  });
});
