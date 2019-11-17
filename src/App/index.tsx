import React, { SFC, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import emptyImg from '../static/empty.svg';
import { root, app, container } from './styles';

const App: SFC<{}> = () => {
  const [showImg, setShowImg] = useState(true);

  setTimeout(() => {
    setShowImg(true);
  }, 1000);

  return (
    <>
      <Global
        styles={css`
          ${normalize}
          ${root}
        `}
      />
      <div css={app}>
        <div css={container}>
          {showImg && (
            <Img
              src="https://picsum.photos/500"
              // defaultSrc={loadingImg}
              errorSrc={emptyImg}
              // decode={false}
              // defaultAsError={false}
              width="250"
              // height="500"
              // onLoad={e => {
              //   console.log('LOG ===> Load: ', e);
              // }}
              // onError={e => {
              //   console.log('LOG ===> Error: ', e);
              // }}
              alt="Image"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
