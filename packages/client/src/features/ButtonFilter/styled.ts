import styled from 'styled-components';
import BaseButton from '@beans/button';

import { textXS } from 'styles';

const Wrapper = styled.div`
  padding: 4px 4px;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
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
