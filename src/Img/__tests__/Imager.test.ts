import Imager from '../Imager';

describe('Imager', () => {
  Imager.prototype.clearImgSrc = jest.fn();
  jest.useFakeTimers();

  const SUCCESS_SRC = 'SUCCESS_SRC';
  const FAILURE_SRC = 'FAILURE_SRC';
  const ERROR_EVT = { mock: '' };
  const LOAD_EVT = { mock: '' };

  interface Return {
    load: Function;
    unload: Function;
  }
  interface Params {
    src?: string;
    crossOrigin?: string;
    decode?: boolean;
    retry?: { count: number; delay: number; acc?: string };
    onError?: (event: Event) => void;
    onLoad?: (event: Event) => void;
  }

  const createImage = (ins: Imager): Return => ({
    load: ({
      src = SUCCESS_SRC,
      crossOrigin,
      decode = false,
      retry = null,
      onError = (): void => {},
      onLoad = (): void => {}
    }: Params): void => {
      ins.load(src, crossOrigin, decode, retry, onError, onLoad);
    },
    unload: (): void => {
      ins.unload();
    }
  });

  beforeAll(() => {
    let crossOrigin: undefined;
    let source: undefined;

    // Mock Image events
    // @ts-ignore
    Object.defineProperties(global.Image.prototype, {
      src: {
        set(src): void {
          source = src;

          if (src === FAILURE_SRC) {
            setTimeout(() => this.onerror(ERROR_EVT));
          } else if (src === SUCCESS_SRC) {
            setTimeout(() => this.onload(LOAD_EVT));
          }
        },
        get(): void {
          return source;
        }
      },
      crossOrigin: {
        set(str): void {
          crossOrigin = str;
        },
        get(): void {
          return crossOrigin;
        }
      },
      decode: {
        value: (): any => Promise.resolve(),
        writable: true
      }
    });
  });

  it('should trigger onError (with auto-retry) when failed to load image', done => {
    const image = createImage(new Imager());
    const onError = (event: Event): void => {
      expect(event).toMatchObject(ERROR_EVT);
      done();
    };
    const onLoad = jest.fn();
    const retry = { count: 3, delay: 2 };

    // Without auto-retry
    image.load({ src: FAILURE_SRC, onError, onLoad });

    expect(setTimeout).toBeCalledTimes(1);
    expect(onLoad).not.toBeCalled();

    // With auto-retry
    image.load({ src: FAILURE_SRC, retry, onError, onLoad });

    jest.runAllTimers();

    expect(setTimeout).toBeCalledTimes(retry.count * 2 + 2);
    expect(onLoad).not.toBeCalled();
  });

  it('should trigger onLoad when success to load image', done => {
    const image = createImage(new Imager());
    const onError = jest.fn();
    const onLoad = (event: Event): void => {
      expect(event).toMatchObject(LOAD_EVT);
      done();
    };

    image.load({ onError, onLoad });

    jest.runAllTimers();

    expect(onError).not.toBeCalled();
  });

  it('should set crossOrigin correctly', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load({});

    expect(imager.img.crossOrigin).toBeUndefined();

    const crossOrigin = 'anonymous';

    image.load({ crossOrigin });

    setTimeout(() => {
      expect(imager.img.crossOrigin).toBe(crossOrigin);
    });
  });

  it('should call decode method', () => {
    // @ts-ignore
    const decode = jest.spyOn(global.Image.prototype, 'decode');
    const image = createImage(new Imager());

    image.load({});

    expect(decode).not.toBeCalled();

    image.load({ decode: true });

    expect(decode).toBeCalled();
  });

  it('should clear img.src and reset variables', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load({ src: FAILURE_SRC, retry: { count: 3, delay: 2 } });

    jest.runAllTimers();

    expect(imager.img.onerror).not.toBeNull();
    expect(imager.img.onload).not.toBeNull();
    expect(imager.img.src).toBe(FAILURE_SRC);
    expect(imager.img).not.toBeNull();
    expect(imager.timeOut).not.toBeNull();
    expect(imager.retries).not.toBe(1);

    image.unload();

    expect(imager.clearImgSrc).toBeCalled();
    expect(imager.img).toBeNull();
    expect(clearTimeout).toBeCalled();
    expect(imager.timeOut).toBeNull();
    expect(imager.retries).toBe(1);
  });
});
