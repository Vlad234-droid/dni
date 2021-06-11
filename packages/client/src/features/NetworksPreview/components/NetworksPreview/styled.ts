import styled from 'styled-components';

import Media from 'styles/media';
import { Heading } from 'features/Common';

export const Title = styled(Heading)`
  &:last-child {
    max-width: 714px;
    margin: 0 auto;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  ${Media.tablet`
    flex-wrap: nowrap;
    flex-direction: row;
    margin-bottom: 24px;
  `}
`;

export const IconsWrapper = styled.div`
  display: none;

  ${Media.tablet`
    display: flex;
    margin-bottom: 40px;
    padding: 0 2px;
  `}
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
