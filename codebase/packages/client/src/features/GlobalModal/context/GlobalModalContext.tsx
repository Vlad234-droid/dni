import { createContext, useContext } from 'react';

import { initialState } from '../config/state';
import { GlobalModalContextType } from '../config/types';

const GlobalModalContext = createContext<GlobalModalContextType>(initialState);

export const GlobalModalProvider = GlobalModalContext.Provider;

export const useGlobalModal = () => useContext(GlobalModalContext);
