import { generateArray } from '../../../utils';
import { generateFile } from '../built-in';
import { generateBase } from '../base';

const generateUpload = () => ({
  ...generateBase(),
  ...generateFile(),
});

const generateUploads = (length: number) =>
  generateArray(length).map(() => generateUpload());

export { generateUpload, generateUploads };
