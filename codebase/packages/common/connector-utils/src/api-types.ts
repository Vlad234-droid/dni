export type ApiClientConfig = {
  baseHeaders: Record<string, () => string>;
  baseUrl: string;
};

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export type ApiInput<T, U = unknown> = {
  params: T;
  body?: U;
};
