import errorManager, { prefix } from '../errorManager';

describe('errorManager', () => {
  // @ts-ignore
  global.console = { error: jest.fn() };

  const src = 'https://github.com/wellyshen/react-cool-starter';

  it('should throw decode error correctly', () => {
    errorManager('decode', { src });

    expect(global.console.error).toBeCalledWith(
      `${prefix} error decoding image at ${src}`
    );
  });

  it('should throw onerror error correctly', () => {
    errorManager('onerror', { src });

    expect(global.console.error).toBeCalledWith(
      `${prefix} error decoding image at ${src}`
    );
  });

  it('should throw retry error correctly', () => {
    // @ts-ignore
    global.console = { error: jest.fn() };

    errorManager('retry', { retry: null });

    expect(global.console.error).not.toBeCalled();

    errorManager('retry', { retry: { count: 3, delay: 2 } });

    expect(global.console.error).not.toBeCalled();

    errorManager('retry', { retry: { count: 3 } });

    const msg = `${prefix} to use retry, you must setup "count" and "delay"`;

    expect(global.console.error).toBeCalledWith(msg);

    errorManager('retry', { retry: { delay: 2 } });

    expect(global.console.error).toBeCalledWith(msg);
  });
});
