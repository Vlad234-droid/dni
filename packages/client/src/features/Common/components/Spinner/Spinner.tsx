import React, { FC } from 'react';
import styled from 'styled-components';

import BeanSpinner from '@beans/spinner';
import { XX, XS, SM, XL } from '@beans/constants';

const sizes = [XX, XS, SM, XL] as const;

type Props = {
  height?: string;
  width?: string;
  size?: typeof sizes[number];
  defaultLabel?: string;
};

const Spinner: FC<Props> = ({
  height = '100%',
  width = '100%',
  size = XL,
  defaultLabel = 'Loading',
}) => (
  <Wrapper data-testid='spinner' style={{ height, width }}>
    <BeanSpinner accessibleLabel={defaultLabel} size={size} />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
