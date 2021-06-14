import styled from 'styled-components';

import { textXX } from 'styles';

// TODO: get rid of these styled if font-size changes to be as in beans
export const Wrapper = styled.div`
  .beans-date-input__yyyy {
    width: 47px;
  }

  .beans-date-input__mm {
    width: 30px;
  }

  .beans-form-group__error-message {
    max-width: 120px;
    ${textXX};
  }
`;
