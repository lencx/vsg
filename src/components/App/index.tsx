/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { StrictMode, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import { GhProvider } from 'github';
import Router, { RouteOption } from 'router/Router';

const theme = unstable_createMuiStrictModeTheme();

export interface AppProps {
  routes: RouteOption[];
}

const App: FC<AppProps> = ({ routes }) => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GhProvider>
          <BrowserRouter>
            <Router routes={routes} />
          </BrowserRouter>
        </GhProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
