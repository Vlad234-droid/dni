import { generateArray } from './array';

describe('Array utils', () => {
  it('should return array of specific length', () => {
    expect(generateArray(10).length).toEqual(10);
  });
});
