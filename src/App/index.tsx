import React from 'react';

import Img from '../Img';
import loadingImg from './images/loading.gif';
import styles from './styles';

export default () => (
  <div css={styles}>
    <Img
      src="https://picsum.photos/252"
      placeholder={loadingImg}
      // width="252"
      // height="252"
    />
  </div>
);
