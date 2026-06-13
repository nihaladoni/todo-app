import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fontsource/raleway/700.css';
import '@fontsource/montserrat/500.css';
import './index.css';
import { theme } from './theme';

import 'focus-visible/dist/focus-visible';

import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
