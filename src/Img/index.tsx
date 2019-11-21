/* eslint-disable jsx-a11y/alt-text, react-hooks/exhaustive-deps */

import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SFC,
  SyntheticEvent,
  useState,
  useEffect,
  memo
} from 'react';

import useIntersect, { Config } from './useIntersect';
import Imager, { Retry } from './Imager';
import errorManager from './errorManager';

const imager = new Imager();

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  placeholderSrc?: string;
  errorSrc?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  decode?: boolean;
  lazy?: boolean;
  observerConfig?: Config;
  retry?: Retry;
  srcSet?: string;
  sizes?: string;
  onLoad?: (event: SyntheticEvent | Event) => void;
  onError?: (event: SyntheticEvent | Event) => void;
}

const Img: SFC<Props> = ({
  src,
  placeholderSrc,
  errorSrc,
  crossOrigin,
  decode,
  lazy,
  observerConfig,
  retry,
  srcSet,
  sizes,
  onLoad,
  onError,
  ...rest
}: Props) => {
  const [setRef, startLoad] = useIntersect(lazy, observerConfig);
  const [source, setSource] = useState(placeholderSrc || src || errorSrc);
  const isSrc = source === src;

  const handleLoad = (event: SyntheticEvent | Event): void => {
    // @ts-ignore
    const targetSrc = event.target.src;

    if (targetSrc === src) {
      setSource(targetSrc);
      onLoad(event);
    }
  };

  const handleError = (event: SyntheticEvent | Event): void => {
    // @ts-ignore
    const targetSrc = event.target.src;

    errorManager('load-error', { src: targetSrc });

    if (targetSrc === src) {
      if (errorSrc) {
        setSource(errorSrc);
      } else if (placeholderSrc) {
        setSource(placeholderSrc);
      }

      onError(event);
    }
  };

  useEffect(() => {
    if (startLoad)
      imager.load(src, crossOrigin, decode, retry, handleError, handleLoad);

    return (): void => {
      imager.unload();
    };
  }, [startLoad, src, crossOrigin, decode, retry]);

  return (
    <img
      src={source}
      crossOrigin={crossOrigin}
      srcSet={isSrc ? srcSet : null}
      sizes={isSrc ? sizes : null}
      onLoad={isSrc ? null : handleLoad}
      onError={isSrc ? null : handleError}
      ref={setRef}
      {...rest}
    />
  );
};

Img.defaultProps = {
  placeholderSrc: null,
  errorSrc: null,
  crossOrigin: null,
  decode: true,
  lazy: true,
  observerConfig: {},
  retry: null,
  srcSet: null,
  sizes: null,
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
