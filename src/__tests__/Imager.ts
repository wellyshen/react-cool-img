/*  eslint-disable compat/compat, @typescript-eslint/no-unused-vars */

import Imager, { Retry } from "../Imager";

describe("Imager", () => {
  jest.useFakeTimers();
  // @ts-expect-error
  Imager.prototype.clearImgSrc = jest.fn();

  const FAILURE_SRC = "FAILURE_SRC";
  const SUCCESS_SRC = "SUCCESS_SRC";
  const ERROR_EVT = { mock: "" };
  const LOAD_EVT = { mock: "" };

  interface E {
    src?: string;
    crossOrigin?: string;
    decode?: boolean;
    retry?: Retry;
    onError?: (event: Event) => void;
    onLoad?: (event: Event) => void;
  }
  interface Return {
    load: (e?: E) => void;
    unload: () => void;
  }

  const createImage = (instance: Imager): Return => ({
    load: ({
      src = SUCCESS_SRC,
      decode = false,
      retry = {},
      onError = () => null,
      onLoad = () => null,
      crossOrigin,
    }: E = {}) => {
      instance.load(src, decode, retry, onError, onLoad, crossOrigin);
    },
    unload: () => {
      instance.unload();
    },
  });

  beforeAll(() => {
    // @ts-expect-error
    global.Image = jest.fn(() => {
      let crossOrigin = "";
      let src = "";

      return {
        onerror: (e: any) => null,
        onload: (e: any) => null,
        decode: jest.fn(() => Promise.resolve()),
        set src(val: string) {
          if (val === FAILURE_SRC) setTimeout(() => this.onerror(ERROR_EVT));
          if (val === SUCCESS_SRC) setTimeout(() => this.onload(LOAD_EVT));

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
        },
      };
    });
  });

  afterEach(() => {
    // @ts-expect-error
    global.Image.mockClear();
  });

  it("should call onError without auto-retry", () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = (event: Event) => {
        expect(event).toMatchObject(ERROR_EVT);
        done();
      };
      const onLoad = jest.fn();

      image.load({ src: FAILURE_SRC, retry: { count: 0 }, onError, onLoad });

      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(onLoad).not.toHaveBeenCalled();
    });
  });

  it("should call onError with auto-retry", () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = (event: Event) => {
        expect(event).toMatchObject(ERROR_EVT);
        done();
      };
      const onLoad = jest.fn();

      image.load({ src: FAILURE_SRC, onError, onLoad });

      jest.runAllTimers();

      // Default settings
      expect(setTimeout).toHaveBeenCalledTimes(3 * 2 + 2);
      expect(onLoad).not.toHaveBeenCalled();

      const count = 5;

      image.load({ src: FAILURE_SRC, retry: { count } });

      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(count * 2 + 3);
    });
  });

  it("should call onLoad", () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = jest.fn();
      const onLoad = (event: Event) => {
        expect(event).toMatchObject(LOAD_EVT);
        done();
      };

      image.load({ onError, onLoad });

      jest.runAllTimers();

      expect(onError).not.toHaveBeenCalled();
    });
  });

  it("should set crossOrigin correctly", () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load();

    // @ts-expect-error
    expect(imager.img.crossOrigin).toBe("");

    const crossOrigin = "anonymous";

    image.load({ crossOrigin });

    setTimeout(() => {
      // @ts-expect-error
      expect(imager.img.crossOrigin).toBe(crossOrigin);
    });
  });

  it("should call decode method", () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load();

    // @ts-expect-error
    expect(imager.img.decode).not.toHaveBeenCalled();

    image.load({ decode: true });

    // @ts-expect-error
    expect(imager.img.decode).toHaveBeenCalled();
  });

  it("should clear img.src and reset variables", () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load({ src: FAILURE_SRC });

    jest.runAllTimers();

    // @ts-expect-error
    expect(imager.img.onerror).not.toBeNull();
    // @ts-expect-error
    expect(imager.img.onload).not.toBeNull();
    // @ts-expect-error
    expect(imager.img.src).toBe(FAILURE_SRC);
    // @ts-expect-error
    expect(imager.img).not.toBeNull();
    // @ts-expect-error
    expect(imager.timeout).not.toBeNull();
    // @ts-expect-error
    expect(imager.retries).not.toBe(1);

    image.unload();

    // @ts-expect-error
    expect(imager.clearImgSrc).toHaveBeenCalled();
    // @ts-expect-error
    expect(imager.img).toBeNull();
    expect(clearTimeout).toHaveBeenCalled();
    // @ts-expect-error
    expect(imager.timeout).toBeNull();
    // @ts-expect-error
    expect(imager.retries).toBe(1);
  });
});
