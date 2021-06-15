import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

type Props = {
  height?: string;
  maxWidth?: string;
  href?: string;
  fullWidthTooltip?: boolean;
  left?: string;
  top?: string;
  tooltipPosition?: { top: string; left: string };
};

const TextWithEllipsis: FC<Props> = ({
  height = 'auto',
  maxWidth = '100%',
  fullWidthTooltip = false,
  tooltipPosition = { top: '32px', left: '16px' },
  href,
  children,
}) => (
  <>
    <Title height={height} maxWidth={maxWidth} wideButton={!href}>
      {href ? <Link href={href}>{children}</Link> : children}
    </Title>
    <Tooltip className='tooltip' fullWidth={fullWidthTooltip} position={tooltipPosition}>
      {children}
    </Tooltip>
  </>
);

const Title = styled.h5<{ height: string; maxWidth: string; wideButton: boolean }>`
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: ${({ maxWidth }) => maxWidth};
  display: inline-block;
  box-sizing: border-box;
  height: ${({ height }) => height};
  pointer-events: none;
  color: ${({ theme }) => theme.colors.tescoBlue};

  a {
    text-decoration: none;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: ${({ wideButton }) => (wideButton ? '70px' : '30px')};
    height: 100%;
    z-index: 501;
    pointer-events: initial;
  }

  &:hover::before {
    cursor: pointer;
  }

  &:hover + .tooltip {
    visibility: visible;
    transition: opacity 0.5s ease;
    opacity: 1;
    z-index: 500;
  }
`;

const Tooltip = styled.span<{ fullWidth: boolean; position: { top: string; left: string } }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: absolute;
  top: ${({ position }) => position.top};
  left: ${({ position }) => position.left};
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  box-shadow: 1px 1px 6px 0 ${({ theme }) => theme.colors.lines.base};
  opacity: 0;
  transition: opacity 0.5s ease;
`;

export default TextWithEllipsis;
