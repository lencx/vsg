import React, { FC } from 'react';
import Header from '../Header';

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;
