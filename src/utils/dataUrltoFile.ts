async function dataUrlToFile(dataUrl: string, fileName: string, type: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type });
}

export default dataUrlToFile;
