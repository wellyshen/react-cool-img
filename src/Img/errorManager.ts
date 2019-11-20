export const prefix = '🤡react-cool-img:';

interface Params {
  src?: string;
  retry?: { count?: number; delay?: number };
}

export default (type: string, { src, retry }: Params): void => {
  switch (type) {
    case 'decode':
      console.error(`${prefix} error decoding image at ${src}`);
      break;
    case 'onerror':
      console.error(`${prefix} error loading image at ${src}`);
      break;
    case 'retry':
      if (retry && !(retry.count && retry.delay))
        console.error(
          `${prefix} to use retry, you must setup "count" and "delay"`
        );
      break;
    default:
  }
};
