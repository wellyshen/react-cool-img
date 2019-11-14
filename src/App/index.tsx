import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from './images/loading.gif';
import errorImg from './images/error.svg';
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
        placeholderSrc={loadingImg}
        // placeholderAsError={false}
        errorSrc={errorImg}
        // width="100"
        // height="200"
        alt="Image"
      />
    </div>
  </>
);

export default App;
