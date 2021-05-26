import styled from 'styled-components';
import { BaseElement } from '@beans/foundation';
// ts-ignore
import { PromoCarousel } from '@beans/carousel';

const ControlsContainer = styled(BaseElement)`
  --button-border-color: ${({ theme }) => theme.colors.tescoBlue};

  margin-right: 35px;
  z-index: 3;
  height: 100%;
  max-height: 724px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 58px;
  position: absolute;
  top: 60px;
  right: 0;

  & > button:not(:last-child) {
    margin-bottom: 8px;
  }

  svg {
    width: 34px;
    height: 34px;
    margin-left: 15px;
  }
`;

const Controls = styled(BaseElement)`
  align-items: center;
  display: flex;
  height: 170px;

  flex-direction: column;
  justify-content: center;

  ul,
  span,
  .beans-carousel__play-control {
    display: none;
  }

  .beans-carousel__backward-control:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Control = styled(PromoCarousel.Control)`
  border: ${({ theme }) => `3px solid ${theme.colors.tescoBlue}`};
  width: 81px;
  height: 81px;

  :focus,
  :hover {
    box-shadow: 0 0 0 4px rgb(255 255 255 / .6);
  }
}

`;

export { ControlsContainer, Controls, Control };
