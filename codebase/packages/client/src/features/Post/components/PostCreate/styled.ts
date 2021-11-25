import styled from 'styled-components';

import { headingXS, textXX } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  textarea {
    height: 200px;

    ${Media.large_phone`
       height: 300px;
    `}

    ${Media.tablet`
       height: 200px;
    `}

    ${Media.small_desktop`
       height: 300px;
    `}

    ${Media.desktop`
       height: 350px;
    `}
  }

  // when hideLable, required dont work
  .beans-form-group__optional,
  .beans-form-group__label {
    display: none;
  }
  
  .beans-checkbox-with-label__container {
    display: flex;
    align-items: center;
  }

  .beans-checkbox-with-label__label {
    ${textXX};
  }
  
  .beans-checkbox-with-label__label-and-description {
    margin-top: 0;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Title = styled.h3`
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
  ${headingXS};

  ${Media.tablet`
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 28px;
  `}
`;
