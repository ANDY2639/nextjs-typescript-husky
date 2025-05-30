export const calculateExpirationDate = (durationMinutes: number): Date => {
  return new Date(Date.now() + durationMinutes * 60 * 1000);
};
