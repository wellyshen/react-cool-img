import React, { SFC } from 'react';

import Img from '../Img';
import loadingImg from './images/loading.gif';
import styles from './styles';

const App: SFC<{}> = () => (
  <div css={styles}>
    <Img
      src="https://picsum.photos/252"
      placeholderSrc={loadingImg}
      // placeholderAsError={false}
      // width="252"
      // height="252"
      alt="Image"
    />
  </div>
);

export default App;
