import { FC, HTMLProps } from 'react';
import { SubmitHandler } from 'react-hook-form';

// type for testing purpose
type TestProps = {
  testID?: string;
};

type FormField<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: FC<any>;
  name: T;
} & TestProps &
  HTMLProps<HTMLInputElement | HTMLSelectElement>;

interface RowField<T> {
  Element?: undefined;
  data: Array<FormField<T>>;
}

type Elementable = {
  Element?: unknown;
};

type Handler<T> = SubmitHandler<T>;

// TODO: should it stay in types as its a function?
function isRowField<T>(obj: Elementable): obj is RowField<T> {
  return obj.Element == undefined;
}

// TODO: should it stay in types as its a function?
function isFormField<T>(obj: Elementable): obj is FormField<T> {
  return obj.Element !== undefined;
}

export type { FormField, RowField, Elementable, Handler };

export { isRowField, isFormField };
