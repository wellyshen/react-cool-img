import React from 'react';
import { css } from '@emotion/core';

import Img from '../Img';
import loadingImg from './images/loading.gif';

export default () => {
  const styles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  return (
    <div css={styles}>
      <Img src={loadingImg} />
    </div>
  );
};
