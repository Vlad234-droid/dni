import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';
import { PromoCarousel } from '@beans/carousel';

import { GREY_COLOR } from 'styles';

const ControlsContainer = styled(BaseElement)`
  background-color: ${GREY_COLOR};
  height: 58px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Controls = styled(BaseElement)`
  display: flex;
  justify-content: center;
  align-items: center;

  .beans-carousel__forward-control,
  .beans-carousel__backward-control,
  .beans-carousel__play-control {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const Control = styled(PromoCarousel.Control)`
  width: 24px;
  height: 24px;
`;

export { ControlsContainer, Controls, Control };
