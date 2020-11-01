import React from 'react';

import { AppRoutes } from 'routing/AppRoutes';
import { ThemeProvider } from "@chakra-ui/core";

export const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};
