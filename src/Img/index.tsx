/* eslint-disable jsx-a11y/alt-text, react-hooks/exhaustive-deps */

import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SyntheticEvent,
  SFC,
  useRef,
  useState,
  useEffect,
  memo
} from 'react';

import useObserver, { Config } from './useObserver';
import Imager, { Retry } from './Imager';
import errorManager from './errorManager';

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  placeholder?: string;
  error?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  decode?: boolean;
  lazy?: boolean;
  observerConfig?: Config;
  retry?: Retry;
  srcSet?: string;
  sizes?: string;
  onError?: (event?: SyntheticEvent | Event) => void;
  onLoad?: (event?: SyntheticEvent | Event) => void;
}

const Img: SFC<Props> = ({
  src,
  placeholder,
  error,
  crossOrigin,
  decode,
  lazy,
  observerConfig,
  retry,
  srcSet,
  sizes,
  onError,
  onLoad,
  ...rest
}: Props) => {
  const { current: imager } = useRef(new Imager());
  const [setRef, startLoad] = useObserver(lazy, observerConfig);
  const [source, setSource] = useState(
    typeof window === 'undefined' ? src : placeholder || src || error
  );
  const isSrc = source === src;

  const handleError = (event: SyntheticEvent | Event): void => {
    // @ts-ignore
    const targetSrc = event.target.src;

    errorManager('onerror', targetSrc);

    if (targetSrc === src) {
      if (error) {
        setSource(error);
      } else if (placeholder) {
        setSource(placeholder);
      }

      onError(event);
    }
  };

  const handleLoad = (event: SyntheticEvent | Event): void => {
    setSource(src);
    onLoad(event);
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
      onError={isSrc ? null : handleError}
      ref={setRef}
      {...rest}
    />
  );
};

Img.defaultProps = {
  placeholder: null,
  error: null,
  crossOrigin: null,
  decode: true,
  lazy: true,
  observerConfig: {},
  retry: {},
  srcSet: null,
  sizes: null,
  onError: (): void => {},
  onLoad: (): void => {}
};

export default memo(Img);
