import loadImgSize from '../loadImgSize';

describe('loadImgSize', () => {
  const WIDTH = 500;
  const HEIGHT = 500;
  const SUCCESS_SRC = 'SUCCESS_SRC';
  const FAILURE_SRC = 'FAILURE_SRC';

  beforeAll(() => {
    // Mock Image events
    // @ts-ignore
    Object.defineProperties(global.Image.prototype, {
      naturalWidth: {
        value: WIDTH
      },
      naturalHeight: {
        value: HEIGHT
      },
      src: {
        set(src): void {
          if (src === FAILURE_SRC) {
            setTimeout(() => this.onerror());
          } else if (src === SUCCESS_SRC) {
            setTimeout(() => this.onload());
          }
        }
      }
    });
  });

  it('image loaded failure, get error message', done => {
    loadImgSize(FAILURE_SRC, null, null, (error, data) => {
      expect(error).toBe(`Failed to load ${FAILURE_SRC}`);
      expect(data).toBeUndefined();
      done();
    });
  });

  it('image loaded success, get the width and height', done => {
    loadImgSize(SUCCESS_SRC, null, null, (error, data) => {
      expect(error).toBeNull();
      expect(data.width).toBe(WIDTH);
      expect(data.height).toBe(HEIGHT);
      done();
    });
  });

  it('if width and height props are set, use them as image size', done => {
    const width = 250;
    const height = 250;

    loadImgSize(SUCCESS_SRC, width, height, (error, data) => {
      expect(data.width).toBe(width);
      expect(data.height).toBe(height);
      done();
    });
  });

  it('if one of width or height prop is set, auto scale image', done => {
    const width = 200;

    loadImgSize(SUCCESS_SRC, width, null, (error, data) => {
      expect(data.width).toBe(width);
      expect(data.height).toBe(width);
      done();
    });

    const height = 300;

    loadImgSize(SUCCESS_SRC, null, height, (error, data) => {
      expect(data.width).toBe(height);
      expect(data.height).toBe(height);
      done();
    });
  });
});
