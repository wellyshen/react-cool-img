const prefix = '🤡react-cool-img:';
export const msgs = {
  // FIXME: Change URL when README ready
  observer: `
    ${prefix} IntersectionObserver API doesn't support this browser, please install polyfill to enable lazy loading.
    intersection-observer: https://www.npmjs.com/package/intersection-observer
  `,
  decode: (src: string): string => `${prefix} error decoding image at ${src}.`,
  onerror: (src: string): string => `${prefix} error loading image at ${src}.`,
  retry: `${prefix} you must setup "count" and "delay" to enable auto retry.`
};

interface Props {
  src?: string;
  retry?: { count?: number; delay?: number };
}

export default (type: string, props?: Props): void => {
  switch (type) {
    case 'observer':
      console.error(msgs[type]);
      break;
    case 'decode':
      console.error(msgs[type](props.src));
      break;
    case 'onerror':
      console.error(msgs[type](props.src));
      break;
    case 'retry':
      {
        const { retry } = props;
        if (retry && !(retry.count && retry.delay)) console.error(msgs[type]);
      }
      break;
    default:
  }
};
