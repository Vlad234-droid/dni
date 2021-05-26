import { createContext, useContext } from 'react';

export const ImageWrapperContext = createContext<HTMLElement | null>(null);

export const ImageWrapperProvider = ImageWrapperContext.Provider;

export const useImageWrapper = () => useContext(ImageWrapperContext);
