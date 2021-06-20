/* eslint-disable react/prop-types, jsx-a11y/alt-text */

import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  SyntheticEvent,
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  forwardRef,
  memo,
} from "react";

import useObserver, { Options } from "./useObserver";
import * as storage from "./storage";
import Imager, { Retry } from "./Imager";
import useLatest from "./useLatest";

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  className?: string;
  placeholder?: string;
  src: string;
  error?: string;
  crossOrigin?: "" | "anonymous" | "use-credentials";
  decode?: boolean;
  lazy?: boolean;
  cache?: boolean;
  debounce?: number;
  observerOptions?: Options;
  retry?: Retry;
  srcSet?: string;
  sizes?: string;
  ref?: MutableRefObject<HTMLImageElement>;
  onError?: (event: SyntheticEvent | Event) => void;
  onLoad?: (event: SyntheticEvent | Event) => void;
}

const DEFAULT_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const Img = forwardRef<HTMLImageElement, Props>(
  (
    {
      className = "",
      placeholder,
      src,
      error,
      crossOrigin,
      decode = true,
      lazy = true,
      cache = true,
      debounce = 300,
      observerOptions = {},
      retry = {},
      srcSet,
      sizes,
      onError,
      onLoad,
      ...rest
    },
    ref
  ) => {
    const [setImg, startLoad] = useObserver(debounce, observerOptions);
    const [source, setSource] = useState(placeholder || DEFAULT_SRC);
    const imagerRef = useRef<Imager>(new Imager());
    const onErrorRef = useLatest(onError);
    const onLoadRef = useLatest(onLoad);
    const isSrc = source === src;
    const filename = src ? src.replace(/^.*[\\/]/, "").split(".")[0] : "";

    const setRef = (el: HTMLImageElement) => {
      if (!el) return;

      setImg(el);
      // eslint-disable-next-line no-param-reassign
      if (ref) (ref as MutableRefObject<HTMLImageElement>).current = el;
    };

    useEffect(() => {
      if (!src) {
        setSource(placeholder || DEFAULT_SRC);
        return () => null;
      }

      const { current: imager } = imagerRef;

      if (!lazy || (cache && storage.get(src)) || startLoad)
        imager.load(
          src,
          decode,
          retry,
          (e) => {
            setSource((prevSrc) => error || placeholder || prevSrc);
            if (onErrorRef.current) onErrorRef.current(e);
          },
          (e) => {
            setSource(src);
            if (cache) storage.set(src);
            if (onLoadRef.current) onLoadRef.current(e);
          },
          crossOrigin
        );

      return () => imager.unload();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      cache,
      crossOrigin,
      decode,
      error,
      lazy,
      onErrorRef,
      onLoadRef,
      placeholder,
      src,
      startLoad,
    ]);

    return (
      <>
        <img
          className={`${className} no-js-${filename}`}
          src={source}
          crossOrigin={isSrc ? crossOrigin : undefined}
          srcSet={isSrc ? srcSet : undefined}
          sizes={isSrc ? sizes : undefined}
          {...rest}
          ref={setRef}
        />
        {/* For SEO and JavaScript unavailable */}
        <noscript>
          <style>{`.no-js-${filename} { display: none !important; }`}</style>
          <img
            className={className}
            src={src}
            crossOrigin={crossOrigin}
            srcSet={srcSet}
            sizes={sizes}
            {...rest}
          />
        </noscript>
      </>
    );
  }
);

export default memo(Img);
