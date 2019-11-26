import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Img from '../src/Img';
import useObserver from '../src/Img/useObserver';
import Imager from '../src/Img/Imager';

jest.mock('../src/Img/Imager');
jest.mock('../src/Img/useObserver', () =>
  jest.fn(() => {
    const defaultFn = (): void => {};

    return [defaultFn, true, defaultFn];
  })
);

describe('<Img />', () => {
  afterEach(() => {
    // @ts-ignore
    useObserver.mockClear();
    // @ts-ignore
    Imager.mockClear();
  });

  it('', () => {
    // let wrapper;

    act(() => {
      mount(<Img src="123" observerConfig={{}} />);
    });

    // @ts-ignore
    console.log('LOG ===> ', Imager.mock.instances[0].load.mock);

    expect(useObserver).toBeCalled();
    expect(Imager).toBeCalled();
    // @ts-ignore
    // expect(Imager.mock.instances[0].load).not.toBeCalled();
  });
});
