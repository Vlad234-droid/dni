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
};

const TextWithEllipsis: FC<Props> = ({
  height = 'auto',
  maxWidth = '100%',
  fullWidthTooltip = false,
  left = '0',
  top = '0',
  href,
  children,
}) => (
  <>
    <Title height={height} maxWidth={maxWidth} wideButton={!href}>
      {href ? <Link href={href}>{children}</Link> : children}
    </Title>
    <Tooltip className='tooltip' fullWidth={fullWidthTooltip} left={left} top={top}>
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

  //&:hover {
  //  white-space: normal;
  //
  //  span {
  //    visibility: visible;
  //  }
  //}

  //&:hover {
  //  position: relative;
  //  z-index: 20000;
  //  overflow: visible;
  //  width: auto;
  //
  //  a {
  //    background: white;
  //    padding: 4px 8px 4px 0;
  //  }
  //}
`;

const Tooltip = styled.span<{ fullWidth: boolean; left: string; top: string }>`
  //visibility: hidden;
  //position: absolute;
  //z-index: 20000000;
  //left: 0;
  //top: 0;
  //background: white;
  //font-size: 14px;
  ////padding: 4px 8px;
  //width: 100%;
  //font-weight: bold;

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  -webkit-box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.5s ease;
`;

export default TextWithEllipsis;
