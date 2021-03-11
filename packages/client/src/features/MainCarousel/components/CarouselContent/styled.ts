import styled from 'styled-components';
import Media from 'styles/media';

import { headingXXXXL, headingSM, textSM } from 'styles';

export const Wrapper = styled.div`
  position: relative;
  margin: 132px 0 58px;
  background-color: ${({ theme }) => theme.colors.tescoBlue};
  display: flex;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  color: ${({ theme }) => theme.colors.white};
  padding: 40px 16px;
  max-width: 568px;

  ${Media.tablet`
    padding: 48px 24px 48px 65px;
  `}
`;

export const Title = styled.h2`
  margin: 0 0 32px;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  line-height: ${({ theme }) => theme.lineHeight.heading.md};
  ${headingXXXXL}
`;

export const Description = styled.div`
  ${textSM}

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const DescriptionWrapper = styled.div`
  margin-bottom: 40px;
`;

export const SubTitle = styled.h5`
  margin: 0 0 16px;
  ${headingSM}
`;

export const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  width: 70%;

  ${Media.tablet`
    width: auto;
  `}
`;
