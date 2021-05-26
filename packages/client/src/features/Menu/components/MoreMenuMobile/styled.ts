import styled from 'styled-components';
import Media from 'styles/media';
import { HEADER_HEIGHT_MOBILE, FOOTER_HEIGHT } from 'styles';

export const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  bottom: ${FOOTER_HEIGHT};
  top: calc(${HEADER_HEIGHT_MOBILE} - 1px);
  background: ${({ theme }) => theme.colors.background.dark};
  width: 100%;
  z-index: 999;
  padding-top: 24px;
`;

export const ItemsList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines.base};
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  margin-bottom: 24px;

  & a {
    padding: 20px 12px;
    font-size: 16px;

    ${Media.small_desktop`
      padding: 14px 12px;
      font-size: 14px;
  `}

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.lines.base};
    }
  }
`;

export const LinksWrapper = styled.div`
  padding-left: 16px;
`;
