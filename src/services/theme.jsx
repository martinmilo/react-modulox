import React from 'react';
import { ThemeProvider, useTheme as useThemeHook } from 'styled-components';
import defaultTheme from '../../default.theme';

const ModuloXThemeProvider = ({ children, theme }) => (
  <ThemeProvider theme={theme || defaultTheme}>{children}</ThemeProvider>
);

export function useTheme() {
  return useThemeHook();
}

export default ModuloXThemeProvider;
