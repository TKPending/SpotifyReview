export const removeSessionStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
