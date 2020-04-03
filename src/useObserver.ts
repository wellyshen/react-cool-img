import { Dispatch, useState, useRef, useEffect, useCallback } from 'react';

export const observerErr =
  "💡react-cool-img: this browser doesn't support IntersectionObserver, please install polyfill to enable lazy loading. More info: https://github.com/wellyshen/react-cool-img#intersectionobserver-polyfill";
export const thresholdErr =
  '💡react-cool-img: the threshold of observerOptions must be a number. Use 0 as fallback.';

export interface Options {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}
export type Return = readonly [
  Dispatch<HTMLElement | null>,
  boolean,
  Dispatch<boolean>
];

export default (
  debounce: number,
  { root = null, rootMargin = '50px', threshold = 0.01 }: Options
): Return => {
  const [startLoad, setStartLoad] = useState(false);
  const [el, setEl] = useState(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  let numThreshold = threshold;

  if (!window.IntersectionObserver) {
    console.error(observerErr);
    return [setEl, startLoad, setStartLoad];
  }

  if (typeof threshold !== 'number') {
    console.error(thresholdErr);
    numThreshold = 0;
  }

  const resetTimeout = useCallback((): void => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startLoad) {
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

    return (): void => {
      observer.disconnect();
      resetTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, startLoad, root, rootMargin, numThreshold, debounce]);

  // setStartLoad is used for testing
  return [setEl, startLoad, setStartLoad];
};
