import styled from 'styled-components';

import { Heading } from 'features/Common';

export const Title = styled(Heading)`
  margin: 0 0 60px;

  &:last-child {
    max-width: 714px;
    margin: 0 auto;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  padding: 0 2px;
`;

export const Icon = styled.img`
  width: 50%;

  // TODO: try to remove margin-right: -1px hack
  &:first-child {
    margin-right: -1px;
  }

  &:last-child {
    transform: scale(1, -1);
    margin-left: -1px;
  }
`;
