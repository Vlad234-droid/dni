// TODO: temp function
export const slugify = (value: string) => {
  return String(value)
    .toString()
    .replace(/^\s+|\s+$/g, '') // trim
    .toLowerCase() // to lower case
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text
};
