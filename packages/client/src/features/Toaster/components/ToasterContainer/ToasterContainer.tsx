import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import store from 'store';
import { toasterItemsSelector } from '../../store/selectors';
import ToasterItem from '../ToasterItem';

const toasterContainerTestId = 'toaster-container-test-id';

const ToasterContainer: FC = () => {
  const items = useSelector(
    () => toasterItemsSelector(store.getState().toaster),
    shallowEqual,
  );

  return (
    <div data-testid={toasterContainerTestId}>
      {items.map((item) => {
        const { id, skin, data } = item;

        return <ToasterItem key={id} {...{ id, skin, data }} />;
      })}
    </div>
  );
};

export default ToasterContainer;
export { toasterContainerTestId };
