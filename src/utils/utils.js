export const truncateString = (str) =>
  str.length <= 30 ? str : str.slice(0, 30) + '...';
