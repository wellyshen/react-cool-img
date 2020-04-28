import Imager, { Retry } from '../Imager';

describe('Imager', () => {
  jest.useFakeTimers();
  // @ts-ignore
  Imager.prototype.clearImgSrc = jest.fn();

  const FAILURE_SRC = 'FAILURE_SRC';
  const SUCCESS_SRC = 'SUCCESS_SRC';
  const ERROR_EVT = { mock: '' };
  const LOAD_EVT = { mock: '' };

  interface Return {
    load: Function;
    unload: Function;
  }
  interface Args {
    src?: string;
    crossOrigin?: string;
    decode?: boolean;
    retry?: Retry;
    onError?: (event: Event) => void;
    onLoad?: (event: Event) => void;
  }

  const createImage = (instance: Imager): Return => ({
    load: ({
      src = SUCCESS_SRC,
      crossOrigin = null,
      decode = false,
      retry = {},
      onError = (): void => null,
      onLoad = (): void => null,
    }: Args = {}): void => {
      instance.load(src, crossOrigin, decode, retry, onError, onLoad);
    },
    unload: (): void => {
      instance.unload();
    },
  });

  beforeAll(() => {
    // @ts-ignore
    global.Image = jest.fn(() => {
      let crossOrigin = '';
      let src = '';

      return {
        onerror: (): void => null,
        onload: (): void => null,
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
    // @ts-ignore
    global.Image.mockClear();
  });

  it('should call onError without auto-retry', () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = (event: Event): void => {
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

  it('should call onError with auto-retry', () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = (event: Event): void => {
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

  it('should call onLoad', () => {
    return new Promise((done) => {
      const image = createImage(new Imager());
      const onError = jest.fn();
      const onLoad = (event: Event): void => {
        expect(event).toMatchObject(LOAD_EVT);
        done();
      };

      image.load({ onError, onLoad });

      jest.runAllTimers();

      expect(onError).not.toHaveBeenCalled();
    });
  });

  it('should set crossOrigin correctly', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load();

    // @ts-ignore
    expect(imager.img.crossOrigin).toBe('');

    const crossOrigin = 'anonymous';

    image.load({ crossOrigin });

    setTimeout(() => {
      // @ts-ignore
      expect(imager.img.crossOrigin).toBe(crossOrigin);
    });
  });

  it('should call decode method', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load();

    // @ts-ignore
    expect(imager.img.decode).not.toHaveBeenCalled();

    image.load({ decode: true });

    // @ts-ignore
    expect(imager.img.decode).toHaveBeenCalled();
  });

  it('should clear img.src and reset variables', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load({ src: FAILURE_SRC });

    jest.runAllTimers();

    // @ts-ignore
    expect(imager.img.onerror).not.toBeNull();
    // @ts-ignore
    expect(imager.img.onload).not.toBeNull();
    // @ts-ignore
    expect(imager.img.src).toBe(FAILURE_SRC);
    // @ts-ignore
    expect(imager.img).not.toBeNull();
    // @ts-ignore
    expect(imager.timeout).not.toBeNull();
    // @ts-ignore
    expect(imager.retries).not.toBe(1);

    image.unload();

    // @ts-ignore
    expect(imager.clearImgSrc).toHaveBeenCalled();
    // @ts-ignore
    expect(imager.img).toBeNull();
    expect(clearTimeout).toHaveBeenCalled();
    // @ts-ignore
    expect(imager.timeout).toBeNull();
    // @ts-ignore
    expect(imager.retries).toBe(1);
  });
});
