import MyImg from '../MyImg';

describe('MyImg', () => {
  const myImg = new MyImg();
  const SUCCESS_SRC = 'SUCCESS_SRC';
  const FAILURE_SRC = 'FAILURE_SRC';
  const ERROR_EVT = { msg: 'mock event' };
  const LOAD_EVT = { msg: 'mock event' };

  beforeAll(() => {
    let source: undefined;
    let crossOrigin: undefined;

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
        get(): string {
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

  it('image loaded failure, trigger onError callback', done => {
    const onError = (event: Event): void => {
      expect(event).toMatchObject(ERROR_EVT);
      done();
    };
    const onLoad = jest.fn();

    myImg.load(FAILURE_SRC, null, true, onError, onLoad);

    expect(onLoad).not.toBeCalled();
  });

  it('image loaded success, trigger onLoad callback', done => {
    const onError = jest.fn();
    const onLoad = (event: Event): void => {
      expect(event).toMatchObject(LOAD_EVT);
      done();
    };

    myImg.load(SUCCESS_SRC, null, true, onError, onLoad);

    expect(onError).not.toBeCalled();
  });

  it("set Image's crossOrigin attribute correctly", () => {
    myImg.load(
      SUCCESS_SRC,
      null,
      true,
      () => {},
      () => {}
    );

    expect(myImg.img.crossOrigin).toBeUndefined();

    const crossOrigin = '';

    myImg.load(
      SUCCESS_SRC,
      crossOrigin,
      true,
      () => {},
      () => {}
    );

    setTimeout(() => {
      expect(myImg.img.crossOrigin).toBe(crossOrigin);
    });
  });

  it("call Image's decode method correctly", () => {
    // @ts-ignore
    const decode = jest.spyOn(global.Image.prototype, 'decode');

    myImg.load(
      SUCCESS_SRC,
      null,
      false,
      () => {},
      () => {}
    );

    expect(decode).not.toBeCalled();

    myImg.load(
      SUCCESS_SRC,
      null,
      true,
      () => {},
      () => {}
    );

    expect(decode).toBeCalled();
  });

  it('image unload, clear "onerror", "onload", "src" properties and Image instance', () => {
    const src = 'mock src';

    myImg.load(
      src,
      null,
      true,
      () => {},
      () => {}
    );

    expect(myImg.img.onerror).toBeInstanceOf(Function);
    expect(myImg.img.onload).toBeInstanceOf(Function);
    expect(myImg.img.src).toBe(src);
    expect(myImg.img).toBeInstanceOf(HTMLImageElement);

    myImg.unload();

    expect(myImg.img).toBeNull();
  });
});
