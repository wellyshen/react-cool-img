import { renderHook, act } from '@testing-library/react-hooks';

import useObserver, { Config, Return as Current } from '../src/Img/useObserver';

describe('useObserver', () => {
  jest.useFakeTimers();

  const img = document.createElement('img');

  interface Args extends Config {
    lazy?: boolean;
  }
  type Return = { current: Current };

  const testHook = ({
    lazy = true,
    root = null,
    rootMargin = '50px',
    threshold = 0.01,
    debounce = 300
  }: Args = {}): Return => {
    const { result } = renderHook(() =>
      useObserver(lazy, { root, rootMargin, threshold, debounce })
    );

    return result;
  };

  const observerMap = new Map();
  const setIsIntersecting = (el: Element, isIntersecting: boolean): void => {
    observerMap.get(el)([{ isIntersecting }]);
  };

  beforeAll(() => {
    // @ts-ignore
    global.IntersectionObserver = jest.fn(
      (cb, { root, rootMargin, threshold }) => ({
        root,
        rootMargin,
        threshold,
        observe: (el: Element): void => {
          observerMap.set(el, cb);
        },
        disconnect: jest.fn()
      })
    );
  });

  afterEach(() => {
    // @ts-ignore
    global.IntersectionObserver.mockClear();
    observerMap.clear();
  });

  it('should skip lazy loading', () => {
    expect(testHook({ lazy: false }).current).toEqual([
      expect.any(Function),
      true,
      expect.any(Function)
    ]);
  });

  it('should setup intersection observer options corretly', () => {
    testHook();

    // @ts-ignore
    let mkObserver = IntersectionObserver.mock.results[0].value;

    expect(mkObserver.root).toBeNull();
    expect(mkObserver.rootMargin).toBe('50px');
    expect(mkObserver.threshold).toBe(0.01);

    const options = { root: document.body, rootMargin: '100px', threshold: 1 };

    testHook(options);

    // @ts-ignore
    mkObserver = IntersectionObserver.mock.results[1].value;

    expect(mkObserver.root).toBe(options.root);
    expect(mkObserver.rootMargin).toBe(options.rootMargin);
    expect(mkObserver.threshold).toBe(options.threshold);
  });

  it('should be out-view state', () => {
    const result = testHook();
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(img, false);

    jest.runAllTimers();

    [setRef, startLoad] = result.current;

    // setTimeout of intersection-observer didn't be called
    expect(setTimeout).toBeCalledTimes(1);
    expect(startLoad).toBeFalsy();
  });

  it('should be out-view state due to debounce', () => {
    const result = testHook();
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(img, true);

    jest.advanceTimersByTime(100);

    [setRef, startLoad] = result.current;

    expect(setTimeout).toBeCalledTimes(3);
    expect(startLoad).toBeFalsy();

    setIsIntersecting(img, false);

    expect(clearTimeout).toBeCalled();
  });

  it('should be in-view state without debounce', () => {
    const debounce = 0;
    const result = testHook({ debounce });
    let [setRef, startLoad, setStartLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(img, true);

    act(() => {
      jest.advanceTimersByTime(debounce);
      setStartLoad(true);
    });

    [setRef, startLoad, setStartLoad] = result.current;

    expect(setTimeout).toBeCalledTimes(7);
    expect(startLoad).toBeTruthy();
  });

  it('should be in-view state with debounce', () => {
    const result = testHook();
    let [setRef, startLoad, setStartLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(img, true);

    act(() => {
      // Default settings
      jest.advanceTimersByTime(300);
      setStartLoad(true);
    });

    [setRef, startLoad, setStartLoad] = result.current;

    expect(setTimeout).toBeCalledTimes(10);
    expect(startLoad).toBeTruthy();
  });
});
