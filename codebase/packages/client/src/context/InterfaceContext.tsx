import React, {createContext, FC, useCallback, useContext} from 'react';
import __useMedia from 'hooks/useMedia';

import {ViewportSize} from 'config/constants';

interface InterfaceContext {
  viewport: ViewportSize;
  isMobile: boolean;
  isLargeMobile: boolean;
  isTablet: boolean;
  isLargeTablet: boolean;
  isDesktop: boolean;
  lt: (size: number) => boolean;
  lte: (size: number) => boolean;
  gt: (size: number) => boolean;
  gte: (size: number) => boolean;
}

export { ViewportSize };

const defaultInterfaceContext: InterfaceContext = {
  viewport: ViewportSize.PHONE,
  isMobile: true,
  isLargeMobile: true,
  isTablet: false,
  isLargeTablet: false,
  isDesktop: true,
  lt: (size: number) => ViewportSize.PHONE < size,
  lte: (size: number) => ViewportSize.PHONE <= size,
  gt: (size: number) => ViewportSize.PHONE > size,
  gte: (size: number) => ViewportSize.PHONE >= size,
};

const InterfaceContext = createContext<InterfaceContext>(defaultInterfaceContext);

export const InterfaceProvider: FC = ({ children }) => {
  const viewport = __useMedia();
  const isMobile = viewport === ViewportSize.PHONE;
  const isLargeMobile = viewport === ViewportSize.LARGE_PHONE;
  const isTablet = viewport === ViewportSize.TABLET;
  const isLargeTablet = viewport === ViewportSize.LARGE_TABLET;
  console.log('viewport', viewport);
  console.log('ViewportSize.LARGE_TABLET', ViewportSize.LARGE_TABLET);
  const isDesktop = viewport === ViewportSize.SMALL_DESKTOP;
  const lt = useCallback((size: number) => viewport < size, [viewport]);
  const lte = useCallback((size: number) => viewport <= size, [viewport]);
  const gt = useCallback((size: number) => viewport > size, [viewport]);
  const gte = useCallback((size: number) => viewport >= size, [viewport]);

  return (
    <InterfaceContext.Provider
      value={{
        viewport,
        isMobile,
        isLargeMobile,
        isTablet,
        isLargeTablet,
        isDesktop,
        lt,
        lte,
        gt,
        gte,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export const useMedia = () => useContext(InterfaceContext);
export { InterfaceContext };