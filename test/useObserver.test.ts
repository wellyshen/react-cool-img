import useObserver from '../src/Img/useObserver';
import { testHook } from './utils';

describe('useObserver', () => {
  const observerMap = new Map();

  beforeAll(() => {
    // @ts-ignore
    global.IntersectionObserver = jest.fn(
      (cb, { root, rootMargin, threshold }) => ({
        root,
        rootMargin,
        threshold,
        observer: jest.fn((el: Element) => {
          observerMap.set(el, cb);
        }),
        disconnect: jest.fn()
      })
    );
  });

  afterEach(() => {
    // @ts-ignore
    global.IntersectionObserver.mockClear();
    observerMap.clear();
  });

  it("should skip lazy loading if it's turned off", () => {
    let res;

    testHook(() => {
      res = useObserver(false, {});
    });

    expect(res).toEqual([expect.any(Function), true]);
  });

  it('should be not in-view state at the beginning', () => {
    let res;

    testHook(() => {
      res = useObserver(true, {});
    });

    expect(res).toEqual([expect.any(Function), false]);
  });
});
