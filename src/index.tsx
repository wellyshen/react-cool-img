import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import App from './App';

ReactDOM.render(
  <>
    <Global
      styles={css`
        ${normalize}
      `}
    />
    <App />
  </>,
  document.getElementById('app')
);
