/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { StrictMode, FC, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  const handleMsg = (event: any) => {
    // The json data that the extension sent
    const msg: any = event.data;
    if (msg.command === 'configuration') {
      window.localStorage.setItem('vsgh', JSON.stringify(msg.config));
      if (msg.config.token) {
        setHasToken(true);
      }
      // console.log('«27» /components/App/index.tsx ~> ', msg.config);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMsg);
    const config = window.localStorage.getItem('vsgh');

    if (config) {
      try {
        const conf = JSON.parse(config);
        if (conf.token) {
          setHasToken(true);
          setLoading(false);
        }
      } catch (e) {}
    }
    return () => {
      window.removeEventListener('message', handleMsg);
    };
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!hasToken) {
    return (
      <div className="notoken">
        Unable to get the token, please configure{' '}
        <code>{JSON.stringify({ vsgh: { token: 'xxxxxx' } })}</code> in{' '}
        <code>setting.json</code>.
      </div>
    );
  }

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
