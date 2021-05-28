import styled from 'styled-components';

import { headingMD } from 'styles';
import Media from 'styles/media';

const Wrapper = styled.div`
  padding-bottom: 16px;

  ${Media.tablet`
    padding-bottom: 32px;
  `}

  h5 {
    font-weight: normal;
  }

  td:first-child {
    padding-left: 34px;
  }
`;

const Title = styled.h3`
  ${headingMD};
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 16px;
  margin-left: 32px;
`;

const ButtonWrapper = styled.div`
  margin-left: 32px;
`;

const NetworkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  min-width: 40px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 8px;

  img {
    width: auto;
    height: 100%;
    margin-left: -10px;
  }
`;

export { Wrapper, Title, ButtonWrapper, ImageWrapper, NetworkWrapper };
