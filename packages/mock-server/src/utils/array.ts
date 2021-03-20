const generateArray = (length: number) =>
  Array(length)
    .fill(null)
    .map((_, idx) => idx);

export { generateArray };
