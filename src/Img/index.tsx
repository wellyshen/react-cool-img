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

import MyImg from '../utils/MyImg';

const myImg = new MyImg();

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

    console.error(`😱react-cool-img: Error loading image at ${targetSrc}`);

    if (targetSrc === src) {
      if (errorSrc) {
        setSource(errorSrc);
      } else if (defaultSrc) {
        setSource((defaultAsError && defaultSrc) || null);
      }

      onError(event);
    }
  };

  useEffect(() => {
    myImg.load(src, crossOrigin, decode, handleError, handleLoad);

    return (): void => {
      myImg.unload();
    };
  }, [src, crossOrigin, decode]);

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
  srcSet: null,
  sizes: null,
  onLoad: (): void => {},
  onError: (): void => {}
};

export default memo(Img);
