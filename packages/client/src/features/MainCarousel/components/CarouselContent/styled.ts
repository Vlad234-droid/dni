import styled from 'styled-components';

import Media from 'styles/media';
import { LargeHeading } from 'features/Common';
import { headingSM, textSM } from 'styles';

export const Wrapper = styled.div`
  position: relative;
  margin: 22px 0 54px;
  background-color: ${({ theme }) => theme.colors.tescoBlue};
  display: flex;
  justify-content: space-between;
  min-height: 492px;

  ${Media.large_phone`
    margin-top: 72px;
  `}

  ${Media.tablet`
     margin: 132px 0 58px;
     min-height: unset;
  `}
`;

export const ContentWrapper = styled.div.attrs((props) => ({
  className: props.className,
}))`
  position: relative;
  z-index: 4;
  color: ${({ theme }) => theme.colors.white};
  padding: 40px 16px;
  max-width: 568px;

  ${Media.tablet`
    padding: 48px 24px 48px 65px;
  `}
`;

export const Title = styled(LargeHeading)`
  margin: 0 0 24px;

  ${Media.tablet`
    margin-bottom: 32px;
  `}
`;

export const Description = styled.div`
  ${textSM};
  max-width: 328px;

  ${Media.tablet`
     max-width: unset;
  `}

  &:last-child {
    display: none;

    ${Media.tablet`
      display: block;
    `}
  }

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
  max-width: 65%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;

  ${Media.large_phone`
    max-width: 70%;
  `}

  ${Media.tablet`
    max-width: 100%;
  `}
`;
