import {
  Dispatch,
  MutableRefObject,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export const observerErr =
  "💡react-cool-img: the browser doesn't support Intersection Observer, please install polyfill to enable lazy loading: https://github.com/wellyshen/react-cool-img#intersection-observer-polyfill";
export const thresholdWarn =
  "💡react-cool-img: the threshold of observerOptions must be a number. Use 0 as fallback.";

export interface Options {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
}
type Return = readonly [Dispatch<HTMLElement | null>, boolean];

export default (
  debounce: number,
  { root, rootMargin = "50px", threshold = 0.01 }: Options
): Return => {
  const [startLoad, setStartLoad] = useState<boolean>(false);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const observerRef: MutableRefObject<IntersectionObserver | null> = useRef(
    null
  );
  const timeoutRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
  const erroredRef = useRef<boolean>(false);
  let numThreshold = threshold;

  if (typeof threshold !== "number") {
    console.warn(thresholdWarn);
    numThreshold = 0;
  }

  const resetTimeout = useCallback(() => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      !("IntersectionObserverEntry" in window)
    ) {
      if (!erroredRef.current) {
        console.error(observerErr);
        erroredRef.current = true;
      }
      setStartLoad(true);
      return () => null;
    }

    // eslint-disable-next-line compat/compat
    observerRef.current = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }]) => {
        const inView =
          isIntersecting !== undefined ? isIntersecting : intersectionRatio > 0;

        if (inView && !startLoad) {
          timeoutRef.current = setTimeout(() => {
            setStartLoad(true);
          }, debounce);
        } else {
          resetTimeout();
        }
      },
      { root, rootMargin, threshold: numThreshold }
    );

    const { current: observer } = observerRef;

    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      resetTimeout();
    };
  }, [el, startLoad, root, rootMargin, numThreshold, debounce, resetTimeout]);

  return [setEl, startLoad];
};
