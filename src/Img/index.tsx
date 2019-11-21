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

import useInView, { Config } from './useInView';
import Imager, { Retry } from './Imager';
import errorManager from './errorManager';

const imager = new Imager();

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  defaultSrc?: string;
  errorSrc?: string;
  defaultAsError?: boolean;
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
  defaultSrc,
  errorSrc,
  defaultAsError,
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
  const [setRef, inView] = useInView(lazy, observerConfig);
  const [source, setSource] = useState(defaultSrc || src || errorSrc);
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
      } else if (defaultSrc && defaultAsError) {
        setSource(defaultSrc);
      }

      onError(event);
    }
  };

  useEffect(() => {
    if (inView)
      imager.load(src, crossOrigin, decode, retry, handleError, handleLoad);

    return (): void => {
      imager.unload();
    };
  }, [inView, src, crossOrigin, decode, retry]);

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
  defaultSrc: null,
  errorSrc: null,
  defaultAsError: true,
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
