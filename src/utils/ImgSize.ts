export default class {
  prevSrc: string | null;

  constructor() {
    this.prevSrc = null;
  }

  onLoad(src: string | null, w: string, h: string, cb: Function): void {
    if (src === this.prevSrc) return;

    if (!src) {
      cb(null, null);
    } else {
      const img = new Image();

      img.src = src;
      img.onload = (): void => {
        const wRatio = !w && h ? parseInt(h, 10) / img.height : 1;
        const hRatio = w && !h ? parseInt(w, 10) / img.width : 1;

        cb(w || img.width * wRatio, h || img.height * hRatio);
      };
    }

    this.prevSrc = src;
  }

  reset(): void {
    this.prevSrc = null;
  }
}
