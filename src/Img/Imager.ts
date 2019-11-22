/* eslint-disable lines-between-class-members */

import errorManager from './errorManager';

export interface Retry {
  count: number;
  delay: number;
  acc?: '+' | '*' | boolean;
}

export default class Imager {
  img: HTMLImageElement | null;
  retries: number;
  timeout: any;

  constructor() {
    this.img = null;
    this.timeout = null;
    this.retries = 1;
  }

  load(
    src: string,
    crossOrigin: string | null,
    decode: boolean,
    retry: Retry | null,
    onError: (event: Event) => void,
    onLoad: (event: Event) => void
  ): void {
    this.img = new Image();
    this.img.src = src;

    if (crossOrigin) this.img.crossOrigin = crossOrigin;
    if (decode)
      this.img.decode().catch(() => {
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
      if (retry.acc === '+') time = retry.delay * this.retries;
      if (retry.acc === false) time = retry.delay;

      this.timeout = setTimeout(() => {
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
    if (this.img) {
      this.img.onerror = null;
      this.img.onload = null;
      this.clearImgSrc();
      this.img = null;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.retries = 1;
  }

  clearImgSrc(): void {
    this.img.src = '';
    try {
      delete this.img.src;
    } catch (error) {
      // Ignore the error of deleting object properties in Safari strict mode
    }
  }
}
