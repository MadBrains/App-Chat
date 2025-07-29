export const declination = (value: number, word: string) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return `${word}ов`;
  if (num > 1 && num < 5) return `${word}а`;
  if (num == 1) return `${word}`;
  return `${word}ов`;
};
