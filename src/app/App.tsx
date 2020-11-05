import React from 'react';

import { AppRoutes } from 'routing/AppRoutes';
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
};
