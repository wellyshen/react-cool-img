import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import errorImg from '../static/error.svg';
import { root, app, container } from './styles';
import './styles.css';

const App: SFC<{}> = () => (
  <>
    <Global
      styles={css`
        ${normalize}
        ${root}
      `}
    />
    <div css={app}>
      <div css={container}>
        <Img
          className="image"
          src="https://picsum.photos/252"
          placeholderSrc={loadingImg}
          // placeholderAsError={false}
          errorSrc={errorImg}
          // width="100%"
          // height="100%"
          alt="Image"
        />
      </div>
    </div>
  </>
);

export default App;
