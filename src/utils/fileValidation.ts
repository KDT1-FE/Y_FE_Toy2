const MAX_UPLOAD_SIZE = 1 * 1024 * 1024;

const checkImageValidation = (file?: File): boolean => {
  if (file?.size === undefined) return false;
  if (file.size > MAX_UPLOAD_SIZE) return false;
  if (!file.type.includes('png') && !file.type.includes('jpeg') && !file.type.includes('gif')) return false;

  return true;
};

export default checkImageValidation;
