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
  onLoad,
  ...rest
}: Props) => {
  const [imgSz, setImgSz] = useState({ w: null, h: null });
  const [showPlaceholder, setShowPlaceholder] = useState(!!placeholder);

  useEffect(() => {
    if (placeholder)
      placeholderSz.onLoad(placeholder, (w: string, h: string) => {
        console.log(`LOG ==> w: ${w} h: ${h}`);
        setImgSz({ w, h });
      });

    return (): void => {
      if (placeholder) placeholderSz.reset();
    };
  }, [placeholder]);

  const handleLoaded = (): void => {
    setImgSz({ w: null, h: null });
    setShowPlaceholder(false);

    onLoad();
  };

  return (
    <ClassNames>
      {({ cx, css }): ReactNode => (
        <img
          className={cx(
            { [styles(placeholder, css)]: showPlaceholder },
            className
          )}
          src={src}
          width={width || imgSz.w}
          height={height || imgSz.h}
          alt={alt}
          onLoad={handleLoaded}
          {...rest}
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
