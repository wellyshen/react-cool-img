import React, { SFC, ReactElement } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import emptyImg from '../static/empty.svg';
import { container, imageWrapper, image } from './styles';

const App: SFC<{}> = () => {
  const renderImages = (num: number): ReactElement[] => {
    const images = [];

    while (images.length < num) {
      const id = Math.floor(Math.random() * 1400) + 1;

      images.push(
        <Img
          key={images.length}
          css={image}
          placeholder={loadingImg}
          src={`https://picsum.photos/id/${id}/360`}
          error={emptyImg}
          width="280"
          height="280"
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
        <div css={imageWrapper}>{renderImages(100)}</div>
      </div>
    </>
  );
};

export default App;
