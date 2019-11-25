const observerMap = new Map();

export const mockObserver = (): void => {
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
};

export const setIsIntersecting = (
  el: Element,
  isIntersecting: boolean
): void => {
  observerMap.get(el)([{ isIntersecting }]);
};

export const mockImage = (
  failureSrc: string,
  successSrc: string,
  errorEvt: object,
  loadEvt: object
): void => {
  beforeAll(() => {
    // @ts-ignore
    global.Image = jest.fn(() => {
      let crossOrigin = '';
      let src = '';

      return {
        onerror: (): void => {},
        onload: (): void => {},
        decode: jest.fn(() => Promise.resolve()),
        set src(val: string) {
          if (val === failureSrc) setTimeout(() => this.onerror(errorEvt));
          if (val === successSrc) setTimeout(() => this.onload(loadEvt));

          src = val;
        },
        get src(): string {
          return src;
        },
        set crossOrigin(val) {
          crossOrigin = val;
        },
        get crossOrigin(): string {
          return crossOrigin;
        }
      };
    });
  });

  afterEach(() => {
    // @ts-ignore
    global.Image.mockClear();
  });
};
