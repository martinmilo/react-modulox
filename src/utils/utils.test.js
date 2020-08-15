import { injectCSS } from './';
import defaultTheme from '../../default.theme';
import blueprints from '../fragments/blueprints';

describe('Test injextCSS with core blueprints', () => {
  const injectCSSFn = props =>
    injectCSS(blueprints.core, { theme: defaultTheme, ...props });

  it('should return correct CSS styles', () => {
    const injectedCSS = injectCSSFn({
      row: true,
      width: '100%',
      margin: 5,
      styles: 'transition: 125ms;',
    });

    [
      'width: 100%;',
      'display: flex;',
      'margin: 5px;',
      'transition: 125ms;',
    ].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });

  it('should append px when property has appendUnit set to true', () => {
    const injectedCSS = injectCSSFn({ padding: 20, width: 500 });

    ['padding: 20px;', 'width: 500px;'].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });

  it('should return correct background or color from theme', () => {
    const injectedCSS = injectCSSFn({ background: 'red', color: 'green' });

    ['background: #d41111;', 'color: #228B22'].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });

  it('should override value with shorthand', () => {
    const injectedCSS = injectCSSFn({ row: true, display: 'block' });

    expect(injectedCSS).toContain('display: flex;');
  });

  it('should select correct value from theme when path has subpath', () => {
    const injectedCSS = injectCSSFn({ gapHorizontal: 1 });

    expect(injectedCSS).toContain(
      '> *:not(:last-child) { margin-right: 1.5rem; }'
    );
  });

  it('should return hover styles with values from theme', () => {
    const injectedCSS = injectCSSFn({
      color: 'red',
      hover: 'color: blue; width: 200;',
    });

    expect(injectedCSS).toContain(
      'color: #d41111; :hover { width: 200px;color: #add8e6; }'
    );
  });

  describe('when using breakpoint style syntax', () => {
    it('should return styles with correct media queries', () => {
      const injectedCSS = injectCSSFn({
        padding: 's:|10px| d:|20px|',
      });

      [
        '@media (min-width: 992px) { padding: 20px; }',
        'padding: 10px;',
      ].forEach(cssProp => {
        expect(injectedCSS).toContain(cssProp);
      });
    });

    it('should not include styles when using undefined breakpoint key', () => {
      const injectedCSS = injectCSSFn({
        margin: 'xx:|10px| d:|20px|',
      });

      expect(injectedCSS).toContain('margin: 20px;');
      expect(injectedCSS).not.toContain('margin: 10px;');
    });

    it('should select theme value', () => {
      const injectedCSS = injectCSSFn({
        color: 's:|red| d:|blue|',
      });

      [
        '@media (min-width: 992px) { color: #add8e6; }',
        'color: #d41111;',
      ].forEach(cssProp => {
        expect(injectedCSS).toContain(cssProp);
      });
    });

    it('should return gaps for each breakpoint', () => {
      const injectedCSS = injectCSSFn({
        gapHorizontal: 's:|5px| d:|15px|',
      });

      [
        '@media (min-width: 992px) { > *:not(:last-child) { margin-right: 15px; } }',
        '> *:not(:last-child) { margin-right: 5px; }',
      ].forEach(cssProp => {
        expect(injectedCSS).toContain(cssProp);
      });
    });
  });
});

describe('Test injextCSS with text blueprints', () => {
  const injectCSSFn = props =>
    injectCSS(blueprints.text, { theme: defaultTheme, ...props });

  it('should select correct default font family value from theme', () => {
    const injectedCSS = injectCSSFn();

    expect(injectedCSS).toContain("font-family: 'Roboto', serif;");
  });

  it('should set correct breakpoint styles even when BSS (breakpoint style syntax) is used in theme', () => {
    // Expectation from theme file = s:|2.25rem| d:|3rem|
    const injectedCSS = injectCSSFn({ size: 1 });

    [
      '@media (min-width: 992px) { font-size: 3rem; }',
      'font-size: 2.25rem;',
    ].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });

  it('should set correct breakpoint styles with plain values', () => {
    const injectedCSS = injectCSSFn({ size: 's:|1rem| t:|2rem|' });

    [
      '@media (min-width: 768px) { font-size: 2rem; }',
      'font-size: 1rem;',
    ].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });
});
