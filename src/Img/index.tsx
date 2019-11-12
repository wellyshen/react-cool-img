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
  placeholderSrc?: string;
  placeholderAsError?: boolean;
  width?: string;
  height?: string;
  alt?: string;
  className?: string;
  onLoad?: (event: SyntheticEvent) => void;
  onError?: (event: SyntheticEvent) => void;
}

const Img: SFC<Props> = ({
  src,
  placeholderSrc,
  placeholderAsError,
  width,
  height,
  alt,
  className,
  onLoad,
  onError
}: Props) => {
  const [source, setSource] = useState(src);
  const [imgSize, setImgSize] = useState({ width: null, height: null });
  const [showPlaceholder, setShowPlaceholder] = useState(!!placeholderSrc);

  useEffect(() => {
    placeholderImg.onLoad(placeholderSrc, width, height, (w, h) => {
      setImgSize({ width: w, height: h });
    });

    return (): void => {
      placeholderImg.reset();
    };
  }, [placeholderSrc, width, height]);

  const removeBgImg = (): void => {
    setImgSize({ width: null, height: null });
    setShowPlaceholder(false);
  };

  const handleLoaded = (event: SyntheticEvent): void => {
    onLoad(event);

    removeBgImg();
  };

  const handleError = (event: SyntheticEvent): void => {
    onError(event);

    removeBgImg();
    if (placeholderAsError) setSource(placeholderSrc);
  };

  return (
    <ClassNames>
      {({ cx, css }): ReactNode => (
        <img
          className={cx(
            { [styles(placeholderSrc, css)]: showPlaceholder },
            className
          )}
          src={source}
          width={width || imgSize.width}
          height={height || imgSize.height}
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
  placeholderSrc: null,
  placeholderAsError: true,
  width: null,
  height: null,
  alt: null,
  className: '',
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
