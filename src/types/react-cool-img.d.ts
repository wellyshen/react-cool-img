declare module 'react-cool-img' {
  import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    SyntheticEvent,
    SFC
  } from 'react';

  interface Config {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
    debounce?: number;
  }

  interface Retry {
    count?: number;
    delay?: number;
    acc?: '+' | '*' | boolean;
  }

  export interface Props
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

  // eslint-disable-next-line import/prefer-default-export
  export const Img: SFC<Props>;
}
