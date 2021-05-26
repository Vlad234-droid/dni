import styled from 'styled-components';

import Media from 'styles/media';
import { headingXS } from 'styles';
import { LargeHeading } from 'features/Common';

const Wrapper = styled.div`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.white};

  ${Media.tablet`
     margin-bottom: 40px;
  `}
`;

const Title = styled(LargeHeading)`
  margin: 0 0 8px;

  ${Media.tablet`
     margin-bottom: 10px;
  `}
`;

const Subtitle = styled.h4`
  ${headingXS};

  ${Media.tablet`
     font-size: 24px;
     line-height: 28px;
  `}

  p {
    margin-bottom: 8px;
  }
`;

export { Wrapper, Title, Subtitle };
