import styled from 'styled-components';
import BaseButton from '@beans/button';

import { textXS } from 'styles';

const Wrapper = styled.div`
  padding: 4px 4px 32px;

  .beans-form-group__children {
    display: flex;
    flex-wrap: wrap;

    label:not(:last-child) {
      margin-right: 12px;
    }
  }
`;

type ButtonProps = {
  active?: boolean;
};

const Button = styled(BaseButton).attrs<ButtonProps>(({ active }) => ({
  className: !active ? 'secondary' : '',
  variant: active ? 'primary' : 'secondary',
}))`
  vertical-align: text-top;
  & > span {
    font-weight: normal;
    ${textXS};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }

  &.secondary {
    border: none;
  }
`;

export { Wrapper, Button };
