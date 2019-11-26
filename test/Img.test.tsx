import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

import Img from '../src/Img';
import useObserver from '../src/Img/useObserver';
import Imager from '../src/Img/Imager';

jest.mock('../src/Img/Imager');
jest.mock('../src/Img/useObserver');

describe('<Img />', () => {
  const props = {
    placeholder: 'https://placeholder.com',
    src: 'https://src.com',
    error: 'https://error.com',
    alt: 'Really Cool Image'
  };

  const matches = (img: ReactElement): void => {
    const { asFragment } = render(img);
    expect(asFragment()).toMatchSnapshot();
  };

  beforeAll(() => {
    const defaultFn = (): void => {};

    // @ts-ignore
    useObserver.mockImplementation(() => [defaultFn, false, defaultFn]);
  });

  afterEach(() => {
    // @ts-ignore
    useObserver.mockClear();
    // @ts-ignore
    Imager.mockClear();
  });

  it('should render placeholder', () => {
    matches(<Img {...props} />);
  });
});
