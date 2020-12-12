/**
 * @author: lencx
 * @create_at: Dec 6, 2020
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import routesConfig from './routes';
import './index.scss';

ReactDOM.render(<App routes={routesConfig} />, document.getElementById('root'));
