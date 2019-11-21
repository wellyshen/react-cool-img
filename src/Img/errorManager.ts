const prefix = '🤡react-cool-img:';
export const msgs = {
  decode: (src: string): string => `${prefix} error decoding image at ${src}`,
  onerror: (src: string): string => `${prefix} error loading image at ${src}`,
  retry: `${prefix} to use retry, you must setup "count" and "delay"`
};

interface Params {
  src?: string;
  retry?: { count?: number; delay?: number };
}

export default (type: string, { src, retry }: Params): void => {
  switch (type) {
    case 'decode':
      console.error(msgs[type](src));
      break;
    case 'onerror':
      console.error(msgs[type](src));
      break;
    case 'retry':
      if (retry && !(retry.count && retry.delay)) console.error(msgs[type]);
      break;
    default:
  }
};
