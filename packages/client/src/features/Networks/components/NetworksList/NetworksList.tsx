import React, { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from 'store/rootReducer';
import useDispatch from 'hooks/useDispatch';
import NetworksItem from '../NetworksItem';

import {
  getList,
  getOne,
  byIdSelector,
  listSelector,
  ListResponse,
} from '../../store';

const DEFAULT_ID = 1;

const Networks: FC = () => {
  const dispatch = useDispatch();

  // entities
  const list = useSelector(listSelector);
  const defaultNetwork = useSelector((store: RootState) =>
    byIdSelector(store, DEFAULT_ID),
  );

  const getById = useCallback(() => {
    dispatch(getOne({ id: DEFAULT_ID }));
  }, []);

  // load general list
  useEffect(() => {
    dispatch(getList());
  }, []);

  // load default network
  useEffect(() => {
    getById();
  }, [getById]);

  return (
    <Wrapper>
      <div>List</div>
      <div>
        {list.map(({ title, id }) => (
          <NetworksItem key={id}>{title}</NetworksItem>
        ))}
      </div>
      {defaultNetwork && (
        <>
          <div>Default network</div>
          <div>
            <NetworksItem>{defaultNetwork.title}</NetworksItem>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 5px;
  padding-bottom: 20px;
`;

export default Networks;
