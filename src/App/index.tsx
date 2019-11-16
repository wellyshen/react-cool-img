import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import emptyImg from '../static/empty.svg';
import { root, app, container } from './styles';

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
          src="https://picsum.photos/252"
          defaultSrc={loadingImg}
          errorSrc={emptyImg}
          // defaultAsError={false}
          alt="Image"
          // width="200"
          // height="200"
          // onLoad={e => {
          //   console.log('LOG ===> Load: ', e);
          // }}
          // onError={e => {
          //   console.log('LOG ===> Error: ', e);
          // }}
        />
      </div>
    </div>
  </>
);

export default App;
