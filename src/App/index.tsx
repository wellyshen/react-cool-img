import React, { SFC, ReactElement } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import errorImg from '../static/error.png';
import { root, container, title, subtitle, cta, image, cp } from './styles';

const App: SFC<{}> = () => {
  const renderImages = (num: number): ReactElement[] => {
    const images = [];

    while (images.length < num) {
      const id = Math.floor(Math.random() * 1000) + 1;

      images.push(
        <Img
          key={images.length}
          css={image}
          placeholder={loadingImg}
          src={`https://picsum.photos/id/${id}/480`}
          error={errorImg}
          alt="Demo Image"
        />
      );
    }

    return images;
  };

  return (
    <>
      <Global
        styles={css`
          ${normalize}
          ${root}
        `}
      />
      <div css={container}>
        <h1 css={title}>React Cool Img</h1>
        <p css={subtitle}>
          placeholder · lazy loading · cancel loading · auto retry · ssr ·
          typescript support · lightweight
        </p>
        <a href="https://github.com/wellyshen/react-cool-img" css={cta}>
          Try It Now
        </a>
        <div>{renderImages(1)}</div>
        <small css={cp}>Welly Shen ©</small>
      </div>
    </>
  );
};

export default App;
