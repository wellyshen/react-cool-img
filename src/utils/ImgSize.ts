export default class {
  prevSrc: string | null;

  constructor() {
    this.prevSrc = null;
  }

  onLoad(src: string | null, cb: Function) {
    if (!src || src === this.prevSrc) return;

    const img = new Image();

    img.src = src;
    img.onload = () => {
      cb(img.width, img.height);
    };

    this.prevSrc = src;
  }

  reset() {
    this.prevSrc = null;
  }
}
