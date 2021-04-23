import path from 'path';
import { pipe } from './func';

export const getPackageDistFolder = (
  packageName: string,
  [from, to]: [string, string], //replacer
) =>
  pipe(require.resolve, path.dirname, (mainFilePath) =>
    mainFilePath.replace(from, to),
  )(packageName);
