import { getPackageDistFolder } from 'utils';

jest.mock('path', () => ({
  dirname: () => '/test/string/from',
}));

describe('Package utils', () => {
  it('get package dist folder', () => {
    const packageName = 'utils';
    const replacer: [string, string] = ['from', 'to'];

    expect(getPackageDistFolder(packageName, replacer)).toBe('/test/string/to');
  });
});
