import useObserver, { Config } from '../src/Img/useObserver';
import { testHook } from './utils';

describe('useObserver', () => {
  const setNode = expect.any(Function);
  const createHook = (
    lazy = true,
    {
      root = null,
      rootMargin = '50px',
      threshold = 0.01,
      debounce = 300
    }: Config = {}
  ): [Function, boolean] => {
    let res;

    testHook(() => {
      res = useObserver(lazy, { root, rootMargin, threshold, debounce });
    });

    return res;
  };

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
    expect(createHook(false)).toEqual([setNode, true]);
  });

  it('should setup intersection observer options corretly', () => {
    createHook(true);

    // @ts-ignore
    let mockObserver = IntersectionObserver.mock.results[0].value;

    expect(mockObserver.root).toBeNull();
    expect(mockObserver.rootMargin).toBe('50px');
    expect(mockObserver.threshold).toBe(0.01);

    const options = { root: document.body, rootMargin: '100px', threshold: 1 };

    createHook(true, options);

    // @ts-ignore
    mockObserver = IntersectionObserver.mock.results[1].value;

    expect(mockObserver.root).toBe(options.root);
    expect(mockObserver.rootMargin).toBe(options.rootMargin);
    expect(mockObserver.threshold).toBe(options.threshold);
  });

  it('should be out-view state', () => {
    expect(createHook(true)).toEqual([setNode, false]);
  });

  it('should be in-view state', () => {
    // ...
  });
});
