import Imager, { Retry } from '../src/Img/Imager';
import { mockImage } from './utils';

describe('Imager', () => {
  jest.useFakeTimers();
  Imager.prototype.clearImgSrc = jest.fn();

  const FAILURE_SRC = 'FAILURE_SRC';
  const SUCCESS_SRC = 'SUCCESS_SRC';
  const ERROR_EVT = { mock: '' };
  const LOAD_EVT = { mock: '' };

  mockImage(FAILURE_SRC, SUCCESS_SRC, ERROR_EVT, LOAD_EVT);

  interface Return {
    load: Function;
    unload: Function;
  }
  interface Params {
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
      onError = (): void => {},
      onLoad = (): void => {}
    }: Params = {}): void => {
      instance.load(src, crossOrigin, decode, retry, onError, onLoad);
    },
    unload: (): void => {
      instance.unload();
    }
  });

  it('should trigger onError (with auto-retry) when failed to load image', done => {
    const image = createImage(new Imager());
    const onError = (event: Event): void => {
      expect(event).toMatchObject(ERROR_EVT);
      done();
    };
    const onLoad = jest.fn();

    // Without auto-retry
    image.load({ src: FAILURE_SRC, retry: { count: 0 }, onError, onLoad });

    jest.runAllTimers();

    expect(setTimeout).toBeCalledTimes(1);
    expect(onLoad).not.toBeCalled();

    // With default auto-retry
    image.load({ src: FAILURE_SRC, onError, onLoad });

    jest.runAllTimers();

    expect(setTimeout).toBeCalledTimes(3 * 2 + 2);
    expect(onLoad).not.toBeCalled();

    // With specific auto-retry
    const count = 5;

    image.load({ src: FAILURE_SRC, retry: { count }, onError, onLoad });

    jest.runAllTimers();

    expect(setTimeout).toBeCalledTimes(count * 2 + 3);
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

    image.load();

    expect(imager.img.crossOrigin).toBe('');

    const crossOrigin = 'anonymous';

    image.load({ crossOrigin });

    setTimeout(() => {
      expect(imager.img.crossOrigin).toBe(crossOrigin);
    });
  });

  it('should call decode method', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load();

    expect(imager.img.decode).not.toBeCalled();

    image.load({ decode: true });

    expect(imager.img.decode).toBeCalled();
  });

  it('should clear img.src and reset variables', () => {
    const imager = new Imager();
    const image = createImage(imager);

    image.load({ src: FAILURE_SRC });

    jest.runAllTimers();

    expect(imager.img.onerror).not.toBeNull();
    expect(imager.img.onload).not.toBeNull();
    expect(imager.img.src).toBe(FAILURE_SRC);
    expect(imager.img).not.toBeNull();
    expect(imager.timeout).not.toBeNull();
    expect(imager.retries).not.toBe(1);

    image.unload();

    expect(imager.clearImgSrc).toBeCalled();
    expect(imager.img).toBeNull();
    expect(clearTimeout).toBeCalled();
    expect(imager.timeout).toBeNull();
    expect(imager.retries).toBe(1);
  });
});
