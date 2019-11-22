import React, { SFC, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import emptyImg from '../static/empty.svg';
import { root, app, container } from './styles';
import './styles.css';

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
              // className="image"
              src="https://picsum.photos/252?random=1"
              placeholder={loadingImg}
              error={emptyImg}
              // decode={false}
              // width="252"
              // height="252"
              // onLoad={e => {
              //   console.log('LOG ===> Load: ', e);
              // }}
              // onError={e => {
              //   console.log('LOG ===> Error: ', e);
              // }}
              // retry={{ count: 3, delay: 2 }}
              // lazy={false}
              alt="Image"
            />
          )}
        </div>
        <div css={container}>
          <Img
            // className="image"
            src="https://picsum.photos/252?random=2"
            placeholder={loadingImg}
            error={emptyImg}
            // decode={false}
            // width="252"
            // height="252"
            // onLoad={e => {
            //   console.log('LOG ===> Load: ', e);
            // }}
            // onError={e => {
            //   console.log('LOG ===> Error: ', e);
            // }}
            // retry={{ count: 3, delay: 2 }}
            // lazy={false}
            alt="Image"
          />
        </div>
      </div>
    </>
  );
};

export default App;
