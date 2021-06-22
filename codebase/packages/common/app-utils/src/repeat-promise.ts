export const repeatPromise = async <T>(promiseFactory: () => Promise<T>, repeatTimes: number): Promise<T> => {
  let error = undefined;

  for (let i = 0; i < repeatTimes; i++) {
    try {
      return await promiseFactory();
    } catch (err) {
      error = err;
    }
  }

  return Promise.reject(error);
};
