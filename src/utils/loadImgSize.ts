export default (
  src: string,
  w: string,
  h: string,
  cb: (w: string, h: string) => void
): void => {
  const img = new Image();

  img.src = src;
  img.onload = (): void => {
    const wRatio = !w && h ? parseInt(h, 10) / img.height : 1;
    const hRatio = w && !h ? parseInt(w, 10) / img.width : 1;
    const width = (w || img.width * wRatio).toString();
    const height = (h || img.height * hRatio).toString();

    cb(width, height);
  };
};
