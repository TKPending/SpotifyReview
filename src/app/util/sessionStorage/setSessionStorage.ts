export const setSessionStorage = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};
