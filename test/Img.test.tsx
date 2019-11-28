/* eslint-disable import/first */

const FAILURE_SRC = 'FAILURE_SRC';
const SUCCESS_SRC = 'SUCCESS_SRC';

const load = jest.fn((...args) =>
  args[args[0] === FAILURE_SRC ? 4 : 5]({ target: { src: args[0] } })
);
const unload = jest.fn();
jest.mock('../src/Img/Imager', () =>
  jest.fn().mockImplementation(() => ({ load, unload }))
);
jest.mock('../src/Img/useObserver');

import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

import Img from '../src/Img';
import useObserver from '../src/Img/useObserver';

describe('<Img />', () => {
  const props = {
    placeholder: 'PLACEHOLDER',
    error: 'ERROR',
    crossOrigin: 'anonymous' as const,
    decode: true,
    lazy: true,
    observerConfig: { rootMargin: '30px', threshold: 0.1 },
    retry: { count: 5, delay: 2 },
    srcSet: 'cool.png',
    sizes: '100vw',
    onError: jest.fn(),
    onLoad: jest.fn(),
    alt: 'Cool'
  };

  const matchSnapshot = (img: ReactElement): void => {
    expect(render(img).asFragment()).toMatchSnapshot();
  };
  const setStartLoad = (val = false): void => {
    const setState = (): void => {};
    // @ts-ignore
    useObserver.mockImplementation(() => [setState, val, setState]);
  };

  it('should unload src image', () => {
    setStartLoad();

    const { unmount } = render(<Img src={SUCCESS_SRC} {...props} />);

    unmount();
    expect(unload).toBeCalled();
  });

  it('should render placeholder image', () => {
    setStartLoad();
    matchSnapshot(<Img src={SUCCESS_SRC} {...props} />);
  });

  it('should not render placeholder image', () => {
    setStartLoad();
    matchSnapshot(<Img src={SUCCESS_SRC} {...props} placeholder={null} />);
  });

  it('should render src image', () => {
    setStartLoad(true);
    matchSnapshot(<Img src={SUCCESS_SRC} {...props} />);

    const { crossOrigin, decode, retry, onLoad } = props;

    expect(load).toBeCalledWith(
      SUCCESS_SRC,
      crossOrigin,
      decode,
      retry,
      expect.any(Function),
      expect.any(Function)
    );
    expect(onLoad).toBeCalled();
  });

  it('should render error image', () => {
    setStartLoad(true);
    matchSnapshot(<Img src={FAILURE_SRC} {...props} />);

    const { crossOrigin, decode, retry, onError } = props;

    expect(load).toBeCalledWith(
      FAILURE_SRC,
      crossOrigin,
      decode,
      retry,
      expect.any(Function),
      expect.any(Function)
    );
    expect(onError).toBeCalled();
  });

  it('should render placeholder image insteadly', () => {
    setStartLoad(true);
    matchSnapshot(<Img src={FAILURE_SRC} {...props} error={null} />);
  });
});
