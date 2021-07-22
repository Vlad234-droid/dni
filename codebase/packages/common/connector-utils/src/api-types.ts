import { MarkApiCall } from '@energon/splunk-logger';

export type ApiClientConfig = {
  baseHeaders: Record<string, () => string>;
  baseUrl: string;
  markApiCall?: MarkApiCall;
};

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export type ApiInput<T, U = unknown> = {
  params: T;
  body?: U;
};
