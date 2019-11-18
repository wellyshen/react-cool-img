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

import Imager from '../utils/Imager';
import errorManager from '../utils/errorManager';

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
  retry?: { count: number; delay: number; acc?: string };
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
  retry,
  srcSet,
  sizes,
  onLoad,
  onError,
  ...rest
}: Props) => {
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
    imager.load(src, crossOrigin, decode, retry, handleError, handleLoad);

    return (): void => {
      imager.unload();
    };
  }, [src, crossOrigin, decode, retry]);

  return (
    <img
      src={source}
      crossOrigin={crossOrigin}
      srcSet={isSrc ? srcSet : null}
      sizes={isSrc ? sizes : null}
      onLoad={isSrc ? null : handleLoad}
      onError={isSrc ? null : handleError}
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
  retry: null,
  srcSet: null,
  sizes: null,
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
