import React from 'react';
import { ThemeProvider, useTheme as useThemeHook } from 'styled-components';
import colors from './variables/colors';

const ModuloXThemeProvider = ({ children, theme }) => {
  const themeContext = React.useMemo(() => {
    const defaultTheme = { colors };
    return theme || defaultTheme;
  }, [theme]);

  return <ThemeProvider theme={themeContext}>{children}</ThemeProvider>;
};

export function useTheme() {
	return useThemeHook();
}

export default ModuloXThemeProvider;
