export const partition = <T>(list: T[] = [], chunks = 1): Array<T[]> => {
  const isPositiveInteger = Number.isSafeInteger(chunks) && chunks > 0;
  if (!isPositiveInteger) {
    throw new RangeError('Param chunks must be a positive integer');
  }

  const partitions = new Array<T[]>();
  const partitionLength = Math.ceil(list.length / chunks);

  for (let i = 0; i < list.length; i += partitionLength) {
    const partition = list.slice(i, i + partitionLength);
    partitions.push(partition);
  }

  return partitions;
};
