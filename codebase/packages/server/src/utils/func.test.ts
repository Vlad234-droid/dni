import { pipe } from 'utils';

describe('Functional utils', () => {
  it('pipes functions', () => {
    const fnc1 = (val: string) => `fnc1(${val})`;
    const fnc2 = (val: string) => `fnc2(${val})`;
    const fnc3 = (val: string) => `fnc3(${val})`;
    const fnc4 = (val: string) => `fnc4(${val})`;
    const fnc5 = (val: string) => `fnc5(${val})`;

    const pipedFunction = pipe(fnc1, fnc2, fnc3, fnc4, fnc5);
    expect(pipedFunction('in')).toBe('fnc5(fnc4(fnc3(fnc2(fnc1(in)))))');
  });

  it('pipes functions with different initial type', () => {
    const fn1 = (val: string, num: number) => `fn1(${val}-${num})`;
    const fn2 = (val: string) => `fn2(${val})`;
    const fn3 = (val: string) => `fn3(${val})`;

    const pipedFunction = pipe(fn1, fn2, fn3);
    expect(pipedFunction('in', 2)).toBe('fn3(fn2(fn1(in-2)))');
  });
});
