export const validateAge = (value: number) => {
  return value >= 0;
};
export const validateRate = (value: number) => {
  return value >= 0 && value <= 10;
};
