import { ComponentType, FC } from 'react';

enum ModalType {
  SHARE_STORY = 'SHARE_STORY',
}

type ModalProps = any;

type ModalElement = ComponentType | FC<any>;

type Store = {
  modalType?: ModalType | null;
  modalProps?: ModalProps;
};

type GlobalModalContextType = {
  showModal: (modalType: ModalType, modalProps?: ModalProps) => void;
  hideModal: () => void;
  store: Store;
};

export { ModalType };
export type { GlobalModalContextType, ModalElement, Store, ModalProps };
