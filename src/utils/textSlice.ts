const sliceText = (text: string) => {
  if (text.length > 20) return `${text.slice(0, 21)}...`;
  return text;
};
export default sliceText;
