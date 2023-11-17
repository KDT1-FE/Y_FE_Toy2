const storage = typeof window !== 'undefined' ? localStorage : null;

export const getStorage = (key: string, defaultValue = undefined) => {
  try {
    const storedValue = storage?.getItem(key);

    return storedValue || defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setStorage = (key: string, value: string) => {
  try {
    storage?.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = (key: string) => {
  try {
    storage?.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
