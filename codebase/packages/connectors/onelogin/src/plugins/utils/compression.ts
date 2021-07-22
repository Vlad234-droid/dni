import zlib from 'zlib';
import { curry2 } from '@energon/function-utils';

type Decompress = {
  <T>(compress: boolean, compressedString: string): T;
  <T>(compress: boolean): (compressedString: string) => T;
};

/**
 * Returns a base64 decoded, decompressed JSON string
 * @param {string} b64encodedObject b64 encoded stringified object that will be decoded and parsed
 */
export const decompress: Decompress = curry2((compress, compressedString) => {
  if (!compress) return compressedString;
  const compressedBuffer = Buffer.from(compressedString, 'base64');
  const buffer = zlib.brotliDecompressSync(compressedBuffer);
  return buffer.toString();
});

type Compress = {
  <T>(compress: boolean, targetObject: T): T | string;
  <T>(compress: boolean): (targetObject: T) => T | string;
};

/**
 * Returns a base64 encoded, compressed string from plain JS object
 * @param targetObject Plain JS object, will be stringified and b64 encoded
 */
export const compress: Compress = curry2((compress, targetObject) => {
  if (!compress) return targetObject;
  const string = JSON.stringify(targetObject);
  const buffer = Buffer.from(string);
  const compressedBuffer = zlib.brotliCompressSync(buffer);
  const compressedString = compressedBuffer.toString('base64');
  return compressedString;
});
