import { ComponentType, FC } from 'react';

enum ModalType {
  SHARE_STORY = 'SHARE_STORY',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalProps = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
