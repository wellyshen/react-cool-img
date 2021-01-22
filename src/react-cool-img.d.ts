declare module "react-cool-img" {
  import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    SyntheticEvent,
    RefObject,
    ForwardRefExoticComponent,
  } from "react";

  interface Options {
    root?: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  }

  interface Retry {
    count?: number;
    delay?: number;
    acc?: "+" | "*" | boolean;
  }

  export interface ImgProps
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
    ref?: RefObject<HTMLImageElement>;
    onError?: (event: SyntheticEvent | Event) => void;
    onLoad?: (event: SyntheticEvent | Event) => void;
  }

  const Img: ForwardRefExoticComponent<HTMLImageElement, ImgProps>;

  export default Img;
}
