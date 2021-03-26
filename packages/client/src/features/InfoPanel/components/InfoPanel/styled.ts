import styled from 'styled-components';

import { headingXS, headingSM } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div.attrs({
  'data-testid': 'info-panel',
})`
  display: flex;
  align-items: start;
  padding: 16px 16px 32px;
  background: ${({ theme }) => theme.colors.background.warning};
  margin-top: 162px;

  ${Media.tablet`
    padding: 48px 65.5px 54px;
    margin-top: 0;
    align-items: center;
  `}
`;

export const IconWrapper = styled.div`
  svg {
    ${Media.tablet`
      width: 120px;
      height: 120px;
  `}
  }
`;

export const Content = styled.div`
  margin-left: 12px;

  ${Media.tablet`
    margin-left: 65.5px;
  `}
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 8px;
  ${headingSM}

  ${Media.tablet`
    margin-bottom: 24px;
    font-size: 32px;
    line-height: 45px;
  `}
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 16px;
  ${headingXS};

  ${Media.tablet`
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
  `}

  p {
    margin-bottom: 8px;
  }
`;

export const FootnoteWrapper = styled.div`
  margin-bottom: 32px;

  & > p {
    ${Media.small_desktop`
      display: flex;
    `}
    p {
      ${Media.small_desktop`
        margin-right: 4px;
      `}
    }
  }
`;
