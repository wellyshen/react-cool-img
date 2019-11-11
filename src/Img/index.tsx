import React, { SFC, ReactNode, useState, useEffect, memo } from 'react';
import { ClassNames } from '@emotion/core';

import ImgSize from '../utils/ImgSize';
import styles from './styles';

const placeholderSz = new ImgSize();

interface Props {
  src?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  alt?: string;
  className?: string;
  onLoad?: Function;
}

const Img: SFC<Props> = ({
  src,
  placeholder,
  width,
  height,
  alt,
  className,
  onLoad
}: Props) => {
  const [imgSz, setImgSz] = useState({ w: null, h: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    placeholderSz.onLoad(placeholder, width, height, (w: string, h: string) => {
      console.log(`LOG ==> w: ${w} h: ${h}`);
      setImgSz({ w, h });
    });

    return (): void => {
      placeholderSz.reset();
    };
  }, [placeholder, width, height]);

  const handleLoaded = (): void => {
    setImgSz({ w: null, h: null });
    setLoaded(true);

    onLoad();
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
  onLoad: (): void => {}
};

export default memo(Img);
