/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */

import { createTheme } from '@mui/material/styles';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';


export default function App() {
  const queryClient = new QueryClient();
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

