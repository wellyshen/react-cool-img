import errorManager, { msgs } from '../errorManager';

describe('errorManager', () => {
  // @ts-ignore
  global.console = { error: jest.fn() };

  const src = 'https://github.com/wellyshen/react-cool-starter';

  it('should throw observer error correctly', () => {
    errorManager('observer');

    expect(global.console.error).toBeCalledWith(msgs.observer);
  });

  it('should throw decode error correctly', () => {
    errorManager('decode', { src });

    expect(global.console.error).toBeCalledWith(msgs.decode(src));
  });

  it('should throw onerror error correctly', () => {
    errorManager('onerror', { src });

    expect(global.console.error).toBeCalledWith(msgs.onerror(src));
  });

  it('should throw retry error correctly', () => {
    // @ts-ignore
    global.console = { error: jest.fn() };

    errorManager('retry', { retry: null });

    expect(global.console.error).not.toBeCalled();

    errorManager('retry', { retry: { count: 3, delay: 2 } });

    expect(global.console.error).not.toBeCalled();

    errorManager('retry', { retry: { count: 3 } });

    expect(global.console.error).toBeCalledWith(msgs.retry);

    errorManager('retry', { retry: { delay: 2 } });

    expect(global.console.error).toBeCalledWith(msgs.retry);
  });
});
