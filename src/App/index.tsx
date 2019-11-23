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
              placeholder={loadingImg}
              src={`https://fakeimg.pl/252/?text=${Math.floor(
                Math.random() * 100
              ) + 1}`}
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
              // retry={{ count: 1, delay: 10 }}
              // lazy={false}
              // observerConfig={{ debounce: 1000 }}
              alt="Image"
            />
          )}
        </div>
        <div css={container}>
          <Img
            // className="image"
            placeholder={loadingImg}
            src={`https://fakeimg.pl/252/?text=${Math.floor(
              Math.random() * 100
            ) + 1}`}
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
            // retry={{ count: 1, delay: 10 }}
            // lazy={false}
            // observerConfig={{ debounce: 1000 }}
            alt="Image"
          />
        </div>
      </div>
    </>
  );
};

export default App;
