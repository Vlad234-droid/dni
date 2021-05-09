import { ComponentProps, FC } from 'react';
import styled, { css } from 'styled-components';

import { createLinkComponent, LinkProps } from '@energon-components/link';
import { RouteParamsMap } from '@energon/redux-first-router-ext';

import theme from 'theme';

type TRouteParams = RouteParamsMap;

const StyledLink = styled(createLinkComponent<TRouteParams>())<
  Pick<LinkProps, 'variant'>
>`
  && {
    ${({ variant }) =>
      variant === 'beans' &&
      css`
        color: ${theme.colors.active};
      `}
  }
`;

const Link: FC<ComponentProps<typeof StyledLink>> = (props) => {
  return <StyledLink {...props} />;
};

export default Link;
