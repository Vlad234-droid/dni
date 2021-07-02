import { elementsFormatter } from './text-format';

describe('elementsFormatter', () => {
  it('if pass empty array', () => {
    expect(elementsFormatter([])).toEqual('');
  });

  it('if passs only one element array', () => {
    expect(elementsFormatter(['a'])).toEqual('a');
  });

  it('if pass two elements array', () => {
    expect(elementsFormatter(['a', 'b'])).toEqual('a and b');
  });

  it('if pass three elements array', () => {
    expect(elementsFormatter(['a', 'b', 'c'])).toEqual('a, b and c');
  });
});
