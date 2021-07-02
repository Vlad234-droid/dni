import * as A from '@energon/array-utils';

export const elementsFormatter = (elements: string[]): string => {
  if (elements.length === 0) return '';
  if (elements.length === 1) return elements[0];

  return A.reduce(
    (acc, el, index) => {
      if (index === 0) return el;

      if (index === elements.length - 1) {
        acc = acc + ' and ' + el;
      } else {
        acc = acc + ', ' + el;
      }

      return acc;
    },
    '',
    elements,
  );
};
