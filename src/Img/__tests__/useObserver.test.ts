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

  it('', () => {
    // ...
  });
});
