/* eslint-disable import/first */

const load = jest.fn((...args) => args[5]());
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
    placeholder: 'https://placeholder.com',
    src: 'https://src.com',
    error: 'https://error.com',
    crossOrigin: '' as const,
    decode: true,
    retry: { count: 3, delay: 2 },
    alt: 'Really Cool Image'
  };

  const matchSnapshot = (img: ReactElement): void => {
    expect(render(img).asFragment()).toMatchSnapshot();
  };
  const setStartLoad = (val = false): void => {
    const fn = (): void => {};
    // @ts-ignore
    useObserver.mockImplementation(() => [fn, val, fn]);
  };

  it('should render placeholder image', () => {
    setStartLoad();
    matchSnapshot(<Img {...props} />);
  });

  it('should render src image', () => {
    setStartLoad(true);
    matchSnapshot(<Img {...props} />);

    const { src, crossOrigin, decode, retry } = props;
    const fn = expect.any(Function);

    expect(load).toBeCalledWith(src, crossOrigin, decode, retry, fn, fn);
  });
});
