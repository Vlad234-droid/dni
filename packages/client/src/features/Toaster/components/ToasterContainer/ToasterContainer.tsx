import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import store from 'store';
import { toasterItemsSelector } from '../../store/selectors';
import ToasterItem from '../ToasterItem';

const ToasterWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 45px;
  left: 0;
  z-index: 1;
  & > * {
    margin-top: 8px;
  }
`;

const toasterContainerTestId = 'toaster-container-test-id';

const ToasterContainer: FC = () => {
  const items = useSelector(
    () => toasterItemsSelector(store.getState().toaster),
    shallowEqual,
  );

  return (
    <ToasterWrapper data-testid={toasterContainerTestId}>
      {items.map((item) => {
        const { id, skin, data } = item;

        return <ToasterItem key={id} {...{ id, skin, data }} />;
      })}
    </ToasterWrapper>
  );
};

export default ToasterContainer;
export { toasterContainerTestId };
