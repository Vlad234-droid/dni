import styled from 'styled-components';

import { headingXL, headingSM } from 'styles';

export const Wrapper = styled.div.attrs({
  'data-testid': 'info-panel',
})`
  display: flex;
  align-items: center;
  padding: 48px 65.5px 54px;
  background: ${({ theme }) => theme.colors.background.warning};
`;

export const IconWrapper = styled.div`
  svg {
    width: 120px;
    height: 120px;
  }
`;

export const Content = styled.div`
  margin-left: 65.5px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 24px;
  ${headingXL}
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 24px;
  ${headingSM}
  line-height: 28px;
`;
