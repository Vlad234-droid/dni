import React, { useState } from 'react';

import { modalComponents } from '../config/components';
import { GlobalModalProvider } from '../context/GlobalModalContext';
import { Store, ModalType, ModalProps } from '../config/types';

const GlobalModal: React.FC = ({ children }) => {
  const [store, setStore] = useState<Store>({});
  const { modalType, modalProps } = store;

  const showModal = (modalType: ModalType, modalProps: ModalProps = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if (!modalType) {
      return null;
    }

    const ModalComponent = modalComponents[modalType];

    if (!ModalComponent) {
      return null;
    }

    return <ModalComponent id='global-modal' {...modalProps} />;
  };

  return (
    <GlobalModalProvider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalProvider>
  );
};

export default GlobalModal;
