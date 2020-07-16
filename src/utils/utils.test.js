import { injectCSS } from './';
import baseBlueprints from '../fragments/Base/blueprints';
import textBlueprints from '../fragments/Text/blueprints';
import defaultTheme from '../../default.theme';

describe('Test injextCSS with Base Fragment blueprints', () => {
  const injectCSSFn = props =>
    injectCSS(baseBlueprints, { theme: defaultTheme, ...props });

  it('should return correct CSS styles', () => {
    const injectedCSS = injectCSSFn({
      flex: true,
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
    const injectedCSS = injectCSSFn({ flex: true, display: 'block' });

    expect(injectedCSS).toContain('display: flex;');
  });

  it('should select correct value from theme when path has subpath', () => {
    const injectedCSS = injectCSSFn({ gapHorizontal: 1 });

    expect(injectedCSS).toContain(
      '> *:not(:last-child) { margin-right: 1.5rem; }'
    );
  });

  describe('when using breakpoint style syntax', () => {
    it('should return styles with correct media queries', () => {
      const injectedCSS = injectCSSFn({
        padding: 'm:|10px| d:|20px|',
      });

      [
        '@media (min-width: 1200px) { padding: 20px; }',
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
        color: 'm:|red| d:|blue|',
      });

      [
        '@media (min-width: 1200px) { color: #add8e6; }',
        'color: #d41111;',
      ].forEach(cssProp => {
        expect(injectedCSS).toContain(cssProp);
      });
    });

    it('should return gaps for each breakpoint', () => {
      const injectedCSS = injectCSSFn({
        gapHorizontal: 'm:|5px| d:|15px|',
      });

      [
        '@media (min-width: 1200px) { > *:not(:last-child) { margin-right: 15px; } }',
        '> *:not(:last-child) { margin-right: 5px; }',
      ].forEach(cssProp => {
        expect(injectedCSS).toContain(cssProp);
      });
    });
  });
});

describe('Test injextCSS with Text Fragment blueprints', () => {
  const injectCSSFn = props =>
    injectCSS(textBlueprints, { theme: defaultTheme, ...props });

  it('should select correct default font family value from theme', () => {
    const injectedCSS = injectCSSFn();

    expect(injectedCSS).toContain("font-family: 'Roboto', serif;");
  });

  it('should set correct breakpoint styles even when BSS (breakpoint style syntax) is used in theme', () => {
    // Expectation from theme file = m:|2.25rem| d:|3rem|
    const injectedCSS = injectCSSFn({ size: 1 });

    [
      '@media (min-width: 1200px) { font-size: 3rem; }',
      'font-size: 2.25rem;',
    ].forEach(cssProp => {
      expect(injectedCSS).toContain(cssProp);
    });
  });
});
