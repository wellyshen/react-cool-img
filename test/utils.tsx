import React from 'react';
import { mount } from 'enzyme';

const TestHook = ({ cb }: { cb: () => void }): null => {
  cb();
  return null;
};

export const testHook = (cb: () => void): void => {
  mount(<TestHook cb={cb} />);
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
