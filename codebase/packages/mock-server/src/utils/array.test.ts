import { generateArray, randomArray } from './array';

describe('Array utils', () => {
  it('should return array of specific length', () => {
    expect(generateArray(10).length).toEqual(10);
  });

  it('should return array of specific length and items', () => {
    const random = randomArray(2, 2, () => 'test');
    expect(random.length).toEqual(2);
    expect(random.toString()).toEqual('test,test');
  });
});
