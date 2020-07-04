import { renderHook, act } from "@testing-library/react-hooks";

import useObserver, {
  observerErr,
  thresholdWarn,
  Options,
} from "../useObserver";

interface Args extends Options {
  debounce?: number;
}

const renderHelper = ({
  root = null,
  rootMargin = "50px",
  threshold = 0.01,
  debounce = 300,
}: Args = {}) =>
  renderHook(() => useObserver(debounce, { root, rootMargin, threshold }))
    .result;

describe("useObserver › messages", () => {
  const mockIntersectionObserver = jest.fn((_, { threshold }) => ({
    threshold,
    disconnect: (): void => null,
  }));

  beforeAll(() => {
    // @ts-ignore
    global.IntersectionObserver = mockIntersectionObserver;
    // @ts-ignore
    global.IntersectionObserverEntry = jest.fn();
  });

  it("should throw threshold warn", () => {
    console.warn = jest.fn();

    // @ts-ignore
    renderHelper({ threshold: [0.5, 1] });
    expect(console.warn).toHaveBeenCalledWith(thresholdWarn);
    // @ts-ignore
    expect(IntersectionObserver.mock.results[0].value.threshold).toBe(0);
  });

  it("should throw intersection observer error", () => {
    console.error = jest.fn();

    let cur = renderHelper().current;
    expect(console.error).not.toHaveBeenCalled();
    expect(cur[1]).toBeFalsy();

    // @ts-ignore
    delete global.IntersectionObserver;
    cur = renderHelper().current;
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(observerErr);
    expect(cur[1]).toBeTruthy();

    // @ts-ignore
    global.IntersectionObserver = mockIntersectionObserver;
    // @ts-ignore
    delete global.IntersectionObserverEntry;
    cur = renderHelper().current;
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(observerErr);
    expect(cur[1]).toBeTruthy();
  });
});

describe("useObserver", () => {
  jest.useFakeTimers();

  const img = document.createElement("img");
  const disconnect = jest.fn();

  interface Callback {
    (
      e: {
        isIntersecting: boolean;
        intersectionRatio?: number;
      }[]
    ): void;
  }

  let callback: Callback;
  const setIsIntersecting = (
    isIntersecting: boolean,
    intersectionRatio?: number
  ): void => {
    callback([{ isIntersecting, intersectionRatio }]);
  };

  beforeAll(() => {
    // @ts-ignore
    global.IntersectionObserver = jest.fn(
      (cb: Callback, { root, rootMargin, threshold }) => ({
        root,
        rootMargin,
        threshold,
        observe: (): void => {
          callback = cb;
        },
        disconnect,
      })
    );
    // @ts-ignore
    global.IntersectionObserverEntry = jest.fn();
  });

  it("should set the options of intersection observer correctly", () => {
    renderHelper();

    // @ts-ignore
    let mkObserver = IntersectionObserver.mock.results[0].value;

    expect(mkObserver.root).toBeNull();
    expect(mkObserver.rootMargin).toBe("50px");
    expect(mkObserver.threshold).toBe(0.01);

    const options = { root: document.body, rootMargin: "100px", threshold: 1 };

    renderHelper(options);

    // @ts-ignore
    mkObserver = IntersectionObserver.mock.results[1].value;

    expect(mkObserver.root).toBe(options.root);
    expect(mkObserver.rootMargin).toBe(options.rootMargin);
    expect(mkObserver.threshold).toBe(options.threshold);
  });

  it("should be out-view state", () => {
    const result = renderHelper();
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(false);

    jest.runAllTimers();

    [setRef, startLoad] = result.current;

    // setTimeout of intersection-observer didn't be called
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(startLoad).toBeFalsy();
  });

  it("should be out-view state due to debounce", () => {
    const debounce = 300;
    const result = renderHelper({ debounce });
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(true);

    jest.advanceTimersByTime(100);

    [setRef, startLoad] = result.current;

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), debounce);
    expect(startLoad).toBeFalsy();

    setIsIntersecting(false);

    expect(clearTimeout).toHaveBeenCalled();
  });

  it("should be in-view state without debounce", () => {
    const debounce = 0;
    const result = renderHelper({ debounce });
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(true);

    act(() => {
      jest.advanceTimersByTime(debounce);
    });

    [setRef, startLoad] = result.current;

    expect(setTimeout).toHaveBeenCalledTimes(6);
    expect(startLoad).toBeTruthy();
  });

  it("should be in-view state with debounce", () => {
    const result = renderHelper();
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(true);

    act(() => {
      // Default settings
      jest.advanceTimersByTime(300);
    });

    [setRef, startLoad] = result.current;

    expect(setTimeout).toHaveBeenCalledTimes(9);
    expect(startLoad).toBeTruthy();
  });

  it("should stop observe when un-mount", () => {
    renderHelper();

    expect(disconnect).toHaveBeenCalled();
  });

  it("should use intersectionRatio instead of isIntersecting", () => {
    const result = renderHelper();
    let [setRef, startLoad] = result.current;

    act(() => {
      setRef(img);
    });

    setIsIntersecting(undefined, 1);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    [setRef, startLoad] = result.current;

    expect(startLoad).toBeTruthy();
  });
});
