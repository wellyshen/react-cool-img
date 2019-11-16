export default class MyImg {
  img: HTMLImageElement | null;

  constructor() {
    this.img = null;
  }

  load(
    src: string,
    crossOrigin: string,
    decode: boolean,
    onError: (event: Event) => void,
    onLoad: (event: Event) => void
  ): void {
    this.img = new Image();
    this.img.src = src;

    if (crossOrigin) this.img.crossOrigin = crossOrigin;
    if (decode)
      this.img.decode().catch(() => {
        /* istanbul ignore next */
        console.error(`😱react-cool-img: Error decoding image at ${src}`);
      });

    this.img.onerror = (event: Event): void => {
      onError(event);
    };
    this.img.onload = (event: Event): void => {
      onLoad(event);
    };
  }

  unload(): void {
    if (!this.img) return;

    this.img.onerror = null;
    this.img.onload = null;
    this.img.src = '';
    try {
      delete this.img.src;
    } catch (error) {
      // Ignore the error of deleting object properties in Safari strict mode
    }
    this.img = null;
  }
}
