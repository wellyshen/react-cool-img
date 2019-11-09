import React from 'react';
import { css } from '@emotion/core';

import Img from '../Img';
import loadingImg from './images/loading.png';

export default () => (
  <div css={style}>
    <Img src={loadingImg} />
  </div>
);

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
