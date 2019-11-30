const prefix = '👻react-cool-img:';
export const msgs = {
  // FIXME: Change URL when README ready
  observer: `
    ${prefix} IntersectionObserver API doesn't support this browser, please install polyfill to enable lazy loading.
    intersection-observer: https://www.npmjs.com/package/intersection-observer
  `,
  threshold: `${prefix} the threshold of observerConfig must be a number.`,
  decode: (src: string): string => `${prefix} error decoding image at ${src}.`,
  onerror: (src: string): string => `${prefix} error loading image at ${src}.`
};

export default (type: string, src?: string): void => {
  switch (type) {
    case 'observer':
      console.error(msgs[type]);
      break;
    case 'threshold':
      console.error(msgs[type]);
      break;
    case 'decode':
      console.error(msgs[type](src));
      break;
    case 'onerror':
      console.error(msgs[type](src));
      break;
    default:
  }
};
