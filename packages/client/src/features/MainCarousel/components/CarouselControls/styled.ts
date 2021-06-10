import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';
import { PromoCarousel } from '@beans/carousel';

import { GREY_COLOR } from 'styles';

const ControlsContainer = styled(BaseElement)`
  background-color: ${GREY_COLOR};
  height: 56px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Controls = styled(BaseElement)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { ControlsContainer, Controls };
