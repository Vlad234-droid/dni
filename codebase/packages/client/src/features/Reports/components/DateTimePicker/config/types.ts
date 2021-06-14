export type Date = {
  dd: string;
  mm: string;
  yyyy: string;
};

export type Time = {
  hh: string;
  mm: string;
};

export enum Type {
  TYPE_START = 'start',
  TYPE_END = 'end',
}

export type DateTime = Date;

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

export interface RenderProps {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
  isValid: boolean;
}

export interface TimeRenderProps extends RenderProps {
  value: Time;
  handleChange: ({ valid, value }: { valid: TimeValid; value: Time }) => void;
}

export interface DateRenderProps extends RenderProps {
  value: Date;
  handleChange: ({ valid, value }: { valid: DateValid; value: Date }) => void;
}

export interface DateTimeProps {
  id: string;
  name: string;
  labelText: string;
  required: boolean;
}
