import React, { StrictMode, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GhProvider } from 'github';
import Router, { RouteOption } from 'router/Router';

export interface AppProps {
  routes: RouteOption[];
}

const App: FC<AppProps> = ({ routes }) => {
  return (
    <StrictMode>
      <GhProvider>
        <BrowserRouter>
          <Router routes={routes} />
        </BrowserRouter>
      </GhProvider>
    </StrictMode>
  );
};

export default App;
