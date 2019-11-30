import React, { SFC, ReactElement } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import errorImg from '../static/error.png';
import { container, imageWrapper, image } from './styles';

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
          src={`https://picsum.photos/id/${id}/360`}
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
        `}
      />
      <div css={container}>
        <div css={imageWrapper}>{renderImages(300)}</div>
      </div>
    </>
  );
};

export default App;
