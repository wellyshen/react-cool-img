import { useState, useRef, useEffect } from 'react';

import errorManager from './errorManager';

export interface Options {
  root?: Element;
  rootMargin?: string;
  threshold?: number;
}
type Return = [(node?: Element | null) => void, boolean];

export default ({
  root = null,
  rootMargin = '0px',
  threshold = 0
}: Options = {}): Return => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    errorManager('observer');
    return [(): void => {}, true];
  }

  const [inView, setInView] = useState(false);
  const [node, setNode] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    const { current: observer } = observerRef;

    if (node) observer.observe(node);

    return (): void => {
      observer.disconnect();
    };
  }, [node, root, rootMargin, threshold]);

  return [setNode, inView];
};
