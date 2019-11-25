import { renderHook, act } from '@testing-library/react-hooks';

import useObserver, { Config, Return } from '../src/Img/useObserver';
import { mockObserver, setIsIntersecting } from './utils';

describe('useObserver', () => {
  jest.useFakeTimers();

  const img = document.createElement('img');
  const setState = expect.any(Function);
  const testHook = (
    lazy = true,
    {
      root = null,
      rootMargin = '50px',
      threshold = 0.01,
      debounce = 300
    }: Config = {}
  ): { current: Return } => {
    const { result } = renderHook(() =>
      useObserver(lazy, { root, rootMargin, threshold, debounce })
    );

    return result;
  };

  mockObserver();

  it("should skip lazy loading if it's turned off", () => {
    expect(testHook(false).current).toEqual([setState, true, setState]);
  });

  it('should setup intersection observer options corretly', () => {
    testHook();

    // @ts-ignore
    let mkObserver = IntersectionObserver.mock.results[0].value;

    expect(mkObserver.root).toBeNull();
    expect(mkObserver.rootMargin).toBe('50px');
    expect(mkObserver.threshold).toBe(0.01);

    const options = { root: document.body, rootMargin: '100px', threshold: 1 };

    testHook(true, options);

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

    expect(setTimeout).toBeCalled();
    expect(startLoad).toBeFalsy();
  });

  it('should be in-view state', () => {
    const result = testHook();
    let [setRef, startLoad, setStartLoad] = result.current;

    act(() => {
      setRef(img);
      setStartLoad(true);
    });

    setIsIntersecting(img, true);

    jest.runAllTimers();

    [setRef, startLoad, setStartLoad] = result.current;

    expect(setTimeout).toBeCalled();
    expect(startLoad).toBeTruthy();
  });
});
