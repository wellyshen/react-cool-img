import Imager from '../Imager';

describe('Imager', () => {
  const SUCCESS_SRC = 'SUCCESS_SRC';
  const FAILURE_SRC = 'FAILURE_SRC';
  const ERROR_EVT = { mock: '' };
  const LOAD_EVT = { mock: '' };

  Imager.prototype.clearImgSrc = jest.fn();
  const imager = new Imager();
  const image = {
    load: ({
      src,
      crossOrigin,
      decode,
      retry,
      onError,
      onLoad
    }: {
      src?: string;
      crossOrigin?: string;
      decode?: boolean;
      retry?: { count: number; delay: number; acc?: string };
      onError?: (event: Event) => void;
      onLoad?: (event: Event) => void;
    }): void => {
      imager.load(
        src || SUCCESS_SRC,
        crossOrigin,
        decode || false,
        retry || null,
        onError || ((): void => {}),
        onLoad || ((): void => {})
      );
    },
    unload: (): void => {
      imager.unload();
    }
  };

  beforeAll(() => {
    let crossOrigin: undefined;

    // Mock Image events
    // @ts-ignore
    Object.defineProperties(global.Image.prototype, {
      src: {
        set(src): void {
          if (src === FAILURE_SRC) {
            setTimeout(() => this.onerror(ERROR_EVT));
          } else if (src === SUCCESS_SRC) {
            setTimeout(() => this.onload(LOAD_EVT));
          }
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

  it('should trigger onError when failed to load image', done => {
    const onError = (event: Event): void => {
      expect(event).toMatchObject(ERROR_EVT);
      done();
    };
    const onLoad = jest.fn();

    image.load({ src: FAILURE_SRC, onError, onLoad });

    expect(onLoad).not.toBeCalled();
  });

  it('should trigger onLoad when success to load image', done => {
    const onError = jest.fn();
    const onLoad = (event: Event): void => {
      expect(event).toMatchObject(LOAD_EVT);
      done();
    };

    image.load({ onError, onLoad });

    expect(onError).not.toBeCalled();
  });

  it('should set crossOrigin correctly', () => {
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

    image.load({});

    expect(decode).not.toBeCalled();

    image.load({ decode: true });

    expect(decode).toBeCalled();
  });

  it('should clear img.src and reset variables', () => {
    image.load({ src: SUCCESS_SRC });
    image.unload();

    expect(imager.clearImgSrc).toBeCalled();
    expect(imager.timeOut).toBeNull();
    expect(imager.retries).toBe(1);
  });
});
