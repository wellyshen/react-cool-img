import React, { SFC, ReactElement } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import Img from '../Img';
import loadingImg from '../static/loading.gif';
import emptyImg from '../static/empty.svg';
import { root, container } from './styles';

const App: SFC<{}> = () => {
  const renderImages = (num: number): ReactElement[] => {
    const images = [];

    while (images.length <= num) {
      const id = Math.floor(Math.random() * 2000) + 1;

      images.push(
        <div key={images.length}>
          <Img
            placeholder={loadingImg}
            src={`https://picsum.photos/${id}/500`}
            error={emptyImg}
            width="250"
            height="250"
            alt="Demo Image"
          />
        </div>
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
      <div css={container}>{renderImages(5)}</div>
    </>
  );
};

export default App;
