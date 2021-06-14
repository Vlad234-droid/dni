import { RefObject } from 'react';

export type Date = {
  dd: string;
  mm: string;
  yyyy: string;
};

export type Time = {
  hh: string;
  mm: string;
};

export type DateTime = Date | Time;

export type TimePart = keyof Time;

export type ValidTime = Record<TimePart, boolean>;

export type TimeValid = {
  hh: boolean;
  mm: boolean;
};

export type DateValid = {
  dd: boolean;
  mm: boolean;
  yyyy: boolean;
};

export type FieldProps = {
  label?: string;
  error?: string;
  domRef?: RefObject<any>;
};
