import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import store from 'store';

import { toasterItemsSelector } from '../../store/selectors';
import ToasterItem from '../ToasterItem';

const toasterContainerTestId = 'toaster-container-test-id';

const ToasterContainer: FC = () => {
  const items = useSelector(() => toasterItemsSelector(store.getState().toaster), shallowEqual);

  return (
    <div data-testid={toasterContainerTestId}>
      {items.map(({ id, skin, data, timeout }) => (
        <ToasterItem key={id} {...{ id, skin, data, timeout }} />
      ))}
    </div>
  );
};

export default ToasterContainer;
export { toasterContainerTestId };
