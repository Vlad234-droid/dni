import styled from 'styled-components';

import Media from 'styles/media';
import { textSM, headingXL } from 'styles';

export const Wrapper = styled.div`
  position: relative;
  margin-top: 22px;
  background-color: ${({ theme }) => theme.colors.tescoBlue};
  display: flex;
  justify-content: space-between;
  min-height: 474px;

  ${Media.large_phone`
    margin-top: 72px;
  `}

  ${Media.tablet`
     margin-top: 132px;
     min-height: 476px;
  `}
`;

export const ContentWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  z-index: 4;
  color: ${({ theme }) => theme.colors.white};
  padding: 40px 16px;

  ${Media.tablet`
    max-width: 568px;
    padding: 48px 24px 48px 65px;
  `}

  ${Media.desktop`
    max-width: 700px;
  `}
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  ${headingXL};
  margin: 0 0 24px;

  ${Media.tablet`
    font-size: 44px;
    line-height: 1.17;
    margin-bottom: 32px;
  `}
`;

export const Description = styled.div<{ isOpen: boolean }>`
  ${textSM};
  max-width: 328px;

  ${Media.large_phone`
    max-width: 60%;
  `}

  ${Media.tablet`
     max-width: 70%;
  `}
  
  ${Media.small_desktop`
    max-width: unset;
  `}

  &:last-child {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'auto' : '5')};
    overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const DescriptionWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Image = styled.img`
  max-width: 226px;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;

  ${Media.large_phone`
    max-width: 300px;
  `}

  ${Media.tablet`
    max-width: 409px;
  `}
`;
