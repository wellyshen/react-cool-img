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
    crossOrigin: '' as const,
    decode: true,
    retry: { count: 3, delay: 2 },
    alt: 'Really Cool Image'
  };

  const matchSnapshot = (img: ReactElement): void => {
    expect(render(img).asFragment()).toMatchSnapshot();
  };
  const setStartLoad = (val = false): void => {
    const setState = (): void => {};
    // @ts-ignore
    useObserver.mockImplementation(() => [setState, val, setState]);
  };

  it('should render placeholder image', () => {
    setStartLoad();
    matchSnapshot(<Img src={SUCCESS_SRC} {...props} />);
  });

  it('should render src image', () => {
    setStartLoad(true);
    matchSnapshot(<Img src={SUCCESS_SRC} {...props} />);

    const { crossOrigin, decode, retry } = props;

    expect(load).toBeCalledWith(
      SUCCESS_SRC,
      crossOrigin,
      decode,
      retry,
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should render error image', () => {
    setStartLoad(true);
    matchSnapshot(<Img src={FAILURE_SRC} {...props} />);

    const { crossOrigin, decode, retry } = props;

    expect(load).toBeCalledWith(
      FAILURE_SRC,
      crossOrigin,
      decode,
      retry,
      expect.any(Function),
      expect.any(Function)
    );
  });
});
