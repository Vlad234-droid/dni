// TODO: how to apply generics here?
export const getFieldLabel = (fieldName: string): string =>
  fieldName
    .replace(/(\b[a-z](?!\s))/g, (x: string) => x.toUpperCase())
    .replace(/([A-Z])/g, ' $1');
