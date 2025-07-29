export const getSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) as string)
    ? JSON.parse(sessionStorage.getItem(key) as string)
    : {};
};
export const setSessionStorage = (key: string, value: {}) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
