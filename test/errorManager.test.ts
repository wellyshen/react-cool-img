import errorManager, { msgs } from '../src/Img/errorManager';

describe('errorManager', () => {
  // @ts-ignore
  global.console = { error: jest.fn() };

  const src = 'https://github.com/wellyshen/react-cool-starter';

  it('should throw observer error correctly', () => {
    errorManager('observer');

    expect(global.console.error).toBeCalledWith(msgs.observer);
  });

  it('should throw threshold error correctly', () => {
    errorManager('threshold');

    expect(global.console.error).toBeCalledWith(msgs.threshold);
  });

  it('should throw decode error correctly', () => {
    errorManager('decode', src);

    expect(global.console.error).toBeCalledWith(msgs.decode(src));
  });

  it('should throw onerror error correctly', () => {
    errorManager('onerror', src);

    expect(global.console.error).toBeCalledWith(msgs.onerror(src));
  });
});
