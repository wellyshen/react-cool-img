/* eslint-disable react/prop-types, jsx-a11y/alt-text, react/require-default-props, react-hooks/exhaustive-deps */

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
    const imagerRef = useRef<Imager>(new Imager());
    const [setImg, startLoad] = useObserver(debounce, observerOptions);
    const [source, setSource] = useState<string>(
      placeholder ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    );
    const isSrc = source === src;
    const filename = src ? src.replace(/^.*[\\/]/, "").split(".")[0] : "";

    const setRef = (el: HTMLImageElement) => {
      if (!el) return;

      setImg(el);
      // eslint-disable-next-line no-param-reassign
      if (ref) (ref as MutableRefObject<HTMLImageElement>).current = el;
    };

    const handleError = (event: Event) => {
      if (onError) onError(event);

      if (error) {
        setSource(error);
      } else if (placeholder) {
        setSource(placeholder);
      }
    };

    const handleLoad = (event: Event) => {
      if (onLoad) onLoad(event);

      setSource(src);
      if (cache) storage.set(src);
    };

    useEffect(() => {
      const { current: imager } = imagerRef;
      const loadImg = () => {
        imager.load(src, decode, retry, handleError, handleLoad, crossOrigin);
      };

      if (!lazy || (cache && storage.get(src))) {
        loadImg();
      } else if (startLoad) {
        loadImg();
      }

      return () => {
        imager.unload();
      };
    }, [cache, startLoad, src, crossOrigin, decode, retry]);

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
