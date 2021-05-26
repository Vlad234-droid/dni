import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const ItemWrapper = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-right: 48px;
  }
`;
