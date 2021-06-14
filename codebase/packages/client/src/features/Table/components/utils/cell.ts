import React from 'react';
import isPlainObject from 'lodash.isplainobject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCellProps(data: any) {
  let cellProps: { [key: string]: string } = {};

  if (isPlainObject(data) && !React.isValidElement(data)) {
    cellProps = data;
  } else {
    cellProps.value = data;
  }

  return cellProps;
}
