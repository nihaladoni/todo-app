import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fontsource/raleway/700.css';
import '@fontsource/montserrat/500.css';
import './index.css';

import 'focus-visible/dist/focus-visible';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
