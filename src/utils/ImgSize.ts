export default class {
  prevSrc: string | null;

  constructor() {
    this.prevSrc = null;
  }

  onLoad(src: string | null, cb: Function): void {
    if (!src || src === this.prevSrc) return;

    const img = new Image();

    img.src = src;
    img.onload = (): void => {
      cb(img.width, img.height);
    };

    this.prevSrc = src;
  }

  reset(): void {
    this.prevSrc = null;
  }
}
