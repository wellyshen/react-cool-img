/* eslint-disable lines-between-class-members */

import errorManager from './errorManager';

export default class Imager {
  img: HTMLImageElement | null;
  retries: number;
  timeOut: any;

  constructor() {
    this.img = null;
    this.retries = 1;
    this.timeOut = null;
  }

  load(
    src: string,
    crossOrigin: string | null,
    decode: boolean,
    retry: { count: number; delay: number; acc?: string } | null,
    onError: (event: Event) => void,
    onLoad: (event: Event) => void
  ): void {
    this.img = new Image();
    this.img.src = src;

    if (crossOrigin) this.img.crossOrigin = crossOrigin;
    if (decode)
      this.img.decode().catch(() => {
        /* istanbul ignore next */
        errorManager('decode', { src });
      });

    this.img.onerror = (event: Event): void => {
      errorManager('retry', { retry });

      if (
        !retry ||
        !retry.count ||
        !retry.delay ||
        this.retries > retry.count
      ) {
        onError(event);
        return;
      }

      let time = retry.delay ** this.retries;
      /* istanbul ignore if */
      if (retry.acc === 'const') time = retry.delay;
      /* istanbul ignore if */
      if (retry.acc === 'add') time = retry.delay * this.retries;

      this.timeOut = setTimeout(() => {
        this.clearImgSrc();
        this.img.src = src;
      }, time * 1000);

      this.retries += 1;
    };
    this.img.onload = (event: Event): void => {
      onLoad(event);
    };
  }

  unload(): void {
    /* istanbul ignore next */
    if (this.img) {
      this.img.onerror = null;
      this.img.onload = null;
      this.clearImgSrc();
      this.img = null;
    }
    this.retries = 1;
    this.timeOut = null;
  }

  /* istanbul ignore next */
  clearImgSrc(): void {
    this.img.src = '';
    try {
      delete this.img.src;
    } catch (error) {
      // Ignore the error of deleting object properties in Safari strict mode
    }
  }
}
