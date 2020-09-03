/* eslint-disable lines-between-class-members */

export interface Retry {
  count?: number;
  delay?: number;
  acc?: "+" | "*" | boolean;
}

export default class Imager {
  private img: HTMLImageElement | null = null;
  private timeout: NodeJS.Timeout | null = null;
  private retries = 1;

  load(
    src: string,
    decode: boolean,
    { count = 3, delay = 2, acc = "*" }: Retry,
    onError: (event: Event) => void,
    onLoad: (event: Event) => void,
    crossOrigin?: string
  ): void {
    this.img = new Image();
    this.img.src = src;

    if (crossOrigin) this.img.crossOrigin = crossOrigin;
    if (decode && this.img.decode)
      this.img.decode().catch(() => {
        // Ignore decoding error
      });

    // @ts-expect-error
    this.img.onerror = (event: Event) => {
      if (!count || this.retries > count) {
        onError(event);
        return;
      }

      let time = acc === "*" ? delay ** this.retries : delay * this.retries;
      if (acc === false) time = delay;

      this.timeout = setTimeout(() => {
        this.clearImgSrc();
        (this.img as HTMLImageElement).src = src;
      }, time * 1000);

      this.retries += 1;
    };
    this.img.onload = (event: Event) => {
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

  private clearImgSrc() {
    /* istanbul ignore next */
    (this.img as HTMLImageElement).src = "";
    /* istanbul ignore next */
    try {
      /* istanbul ignore next */
      // @ts-ignore
      delete (this.img as HTMLImageElement).src;
    } catch (error) {
      // Ignore the error of deleting object properties in Safari strict mode
    }
  }
}
