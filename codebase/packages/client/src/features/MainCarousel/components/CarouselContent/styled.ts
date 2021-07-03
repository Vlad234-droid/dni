import styled from 'styled-components';

import Media from 'styles/media';
import { textSM, headingMD } from 'styles';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.tescoBlue};
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;

  ${Media.tablet`
     flex-direction: row;
     justify-content: space-between;
  `}
`;

export const ContentWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  color: ${({ theme }) => theme.colors.white};
  padding: 32px 16px;

  ${Media.tablet`
    max-width: 568px;
    padding: 48px 24px 48px 48px;
  `}

  ${Media.desktop`
    max-width: 700px;
  `}
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  ${headingMD};
  margin: 0 0 24px;

  ${Media.tablet`
    font-size: 36px;
    line-height: 1.17;
    margin-bottom: 32px;
  `}
`;

export const Description = styled.div<{ isOpen: boolean }>`
  ${textSM};

  &:last-child {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'auto' : '5')};
    overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  p {
    display: contents !important;
  }
`;

export const DescriptionWrapper = styled.div`
  margin-bottom: 40px;
  padding-right: 48px;
`;

export const Image = styled.img<{ isOpen: boolean }>`
  object-fit: cover;
  object-position: top;
  height: 150px;

  ${Media.large_phone`
    height: 394px;
  `}

  ${Media.tablet`
    max-width: 50%;
    height: 390px;
  `}
`;
