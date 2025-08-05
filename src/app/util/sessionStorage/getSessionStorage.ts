export const getSessionStorage = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
};
