import React, { FC } from 'react';
import styled, { css } from 'styled-components';

const FocusDot: FC<{ active?: boolean, index: number; onClick: (index: number) => void; }> = ({ active, index, onClick }) => (
  <Container onClick={() => onClick(index)}>
    <Hole />
    <RedDot active={active} />
  </Container>
);

const Container = styled.div`
  width: 10px;
  height: 10px;
  pointer-events: all;
  position: relative;
`;

export const absoluteFill = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const dotInactive = css`
  background: transparent;
  transform: scale(0);
`;

export const dotActive = css`
  background: ${({ theme }) => theme.colors.tescoRed};
  transform: scale(1);
  border: none;
`;

const Hole = styled.div`
  ${absoluteFill};
  border-radius: 100%;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.tescoBlue};
`;

const RedDot = styled.div<{ active?: boolean }>`
  ${absoluteFill};
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.tescoBlue};
  transition: all 150ms ease-out;
  ${({ active }) => (active ? dotActive : dotInactive)};
`;

export default FocusDot;
