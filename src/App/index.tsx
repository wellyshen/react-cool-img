import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import placeholderSrc from './images/loading.gif';
import errorSrc from './images/error.svg';
import { root, app } from './styles';

const App: SFC<{}> = () => (
  <>
    <Global
      styles={css`
        ${normalize}
        ${root}
      `}
    />
    <div css={app}>
      <Img
        src="https://picsum.photos/252"
        placeholderSrc={placeholderSrc}
        // placeholderAsError={false}
        errorSrc={errorSrc}
        // width="200"
        // height="200"
        alt="Image"
      />
    </div>
  </>
);

export default App;
