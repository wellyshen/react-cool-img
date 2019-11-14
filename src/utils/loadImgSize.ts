export default (
  src: string,
  w: number,
  h: number,
  cb: (error: any, data?: { width: number; height: number }) => void
): void => {
  const img = new Image();

  img.src = src;
  img.onload = (): void => {
    const { naturalWidth, naturalHeight } = img;
    const wRatio = !w && h ? h / naturalHeight : 1;
    const hRatio = w && !h ? w / naturalWidth : 1;

    cb(null, { width: naturalWidth * wRatio, height: naturalHeight * hRatio });
  };
  img.onerror = (error): void => {
    cb(error);
  };
};
