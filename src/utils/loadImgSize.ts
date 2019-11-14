export default (
  src: string,
  w: number,
  h: number,
  cb: (error: any, data?: { width: number; height: number }) => void
): void => {
  const img = new Image(w, h);

  img.src = src;
  img.onload = (): void => {
    const wRatio = !w && h ? h / img.height : 1;
    const hRatio = w && !h ? w / img.width : 1;

    cb(null, { width: img.width * wRatio, height: img.height * hRatio });
  };
  img.onerror = (error): void => {
    cb(error);
  };
};
