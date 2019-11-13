import React, {
  SFC,
  SyntheticEvent,
  ReactNode,
  useState,
  useEffect,
  memo
} from 'react';
import { ClassNames } from '@emotion/core';

import loadImgSize from '../utils/loadImgSize';
import styles from './styles';

interface Props {
  src?: string;
  placeholderSrc?: string;
  placeholderAsError?: boolean;
  errorSrc?: string;
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
  errorSrc,
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
    if (placeholderSrc)
      loadImgSize(placeholderSrc, width, height, (w, h) => {
        setImgSize({ width: w, height: h });
      });
  }, [placeholderSrc, width, height]);

  const handleLoaded = (event: SyntheticEvent): void => {
    onLoad(event);
    setShowPlaceholder(false);
  };

  const handleError = (event: SyntheticEvent): void => {
    onError(event);

    if (errorSrc) {
      setSource(errorSrc);
    } else if (placeholderAsError && placeholderSrc) {
      setSource(placeholderSrc);
    } else {
      setShowPlaceholder(false);
    }
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
          width={width || showPlaceholder ? imgSize.width : null}
          height={height || showPlaceholder ? imgSize.height : null}
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
  errorSrc: null,
  width: null,
  height: null,
  alt: null,
  className: '',
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
