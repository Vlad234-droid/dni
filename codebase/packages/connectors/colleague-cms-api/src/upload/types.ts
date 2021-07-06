import { File } from '../built-in';
import { BaseApiParams, BaseType } from '../types';

export type UploadApiParams = {
  id: string;
} & BaseApiParams;

export type UploadFile = File & BaseType;

export type UploadBody = {
  files: Buffer | ReadableStream;
  refId: number; // The ID of the entry which the file(s) will be linked to
  ref: string; // The name of the model which the file(s) will be linked to
  field: string; // The field of the entry which the file(s) will be precisely linked to.
};
