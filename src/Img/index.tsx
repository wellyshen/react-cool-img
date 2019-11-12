import React, {
  SFC,
  SyntheticEvent,
  ReactNode,
  useState,
  useEffect,
  memo
} from 'react';
import { ClassNames } from '@emotion/core';

import MyImage from '../utils/MyImage';
import styles from './styles';

const placeholderImg = new MyImage();

interface Props {
  src?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  alt?: string;
  className?: string;
  onLoad?: (event: SyntheticEvent) => void;
  onError?: (event: SyntheticEvent) => void;
}

const Img: SFC<Props> = ({
  src,
  placeholder,
  width,
  height,
  alt,
  className,
  onLoad,
  onError
}: Props) => {
  const [imgSz, setImgSz] = useState({ w: null, h: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    placeholderImg.onLoad(placeholder, width, height, (w, h) => {
      console.log(`LOG ==> w: ${w} h: ${h}`);

      setImgSz({ w, h });
    });

    return (): void => {
      placeholderImg.reset();
    };
  }, [placeholder, width, height]);

  const handleLoaded = (e: SyntheticEvent): void => {
    onLoad(e);

    setImgSz({ w: null, h: null });
    setLoaded(true);
  };

  const handleError = (e: SyntheticEvent): void => {
    onError(e);

    // Handle fallback image...
  };

  return (
    <ClassNames>
      {({ cx, css }): ReactNode => (
        <img
          className={cx({ [styles(placeholder, css)]: !loaded }, className)}
          src={src}
          width={width || imgSz.w}
          height={height || imgSz.h}
          alt={alt}
          onLoad={handleLoaded}
          onError={handleError}
        />
      )}
    </ClassNames>
  );
};

Img.defaultProps = {
  src: null,
  placeholder: null,
  width: null,
  height: null,
  alt: null,
  className: '',
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
