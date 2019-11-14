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
});
