import styled from 'styled-components';

import Media from 'styles/media';
import { headingXS, headingXL } from 'styles';

const Wrapper = styled.div`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.white};

  ${Media.tablet`
     margin-bottom: 40px;
  `}
`;

const Title = styled.h2`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.white};
  ${headingXL};

  ${Media.tablet`
    margin-bottom: 10px;
    font-size: 44px;
    line-height: 1.17;
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
