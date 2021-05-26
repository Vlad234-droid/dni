import styled from 'styled-components';

import Media from 'styles/media';
import { Type } from '../../config/types';

export const CustomIconWrapper = styled.div`
  svg {
    ${Media.tablet`
      width: 120px;
      height: 120px;
  `}
  }
`;

export const IconWrapper = styled.div<{ type: Type }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme, type }) => theme.colors[type]};
  border-radius: 50%;
  padding: 20px;

  ${Media.tablet`
    width: 85px;
    height: 85px;
  `}

  svg {
    stroke-width: 3px;
    width: 22px;
    height: 17px;

    ${Media.tablet`
      stroke-width: 2px;
      width: 40px;
      height: 30px;
  `}

    path {
      stroke: ${({ theme, type }) => theme.colors[type]};
    }
  }
`;
