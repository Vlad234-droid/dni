import { createContext, useContext } from 'react';

export const BreadcrumbWrapperContext = createContext<HTMLElement | null>(null);

export const BreadcrumbWrapperProvider = BreadcrumbWrapperContext.Provider;

export const useBreadcrumbWrapper = () => useContext(BreadcrumbWrapperContext);
