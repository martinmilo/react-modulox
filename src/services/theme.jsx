import React from 'react';
import { ThemeProvider, useTheme as useThemeHook } from 'styled-components';
import defaultTheme from '../../default.theme';

const ModuloXThemeProvider = ({ children, theme }) => {
	const themeValue = React.useMemo(() => theme || defaultTheme, [theme]);

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
};

export function useTheme() {
  return useThemeHook();
}

export default ModuloXThemeProvider;
