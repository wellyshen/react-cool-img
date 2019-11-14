export default (
  src: string,
  w: number,
  h: number,
  cb: (error: string | null, data?: { width: number; height: number }) => void
): void => {
  const img = new Image();

  img.src = src;
  img.onload = (): void => {
    const { naturalWidth, naturalHeight } = img;
    const wRatio = !w && h ? h / naturalHeight : 1;
    const hRatio = w && !h ? w / naturalWidth : 1;

    cb(null, {
      width: w || naturalWidth * wRatio,
      height: h || naturalHeight * hRatio
    });
  };
  img.onerror = (): void => {
    cb(`Failed to load ${src}`);
  };
};
