import styled from 'styled-components';

import { textXX } from 'styles';
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
  
  .beans-checkbox-with-label__label {
    ${textXX};
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
