import { ModalType, ModalElement } from './types';
import ShareStory from '../components/ShareStory';

export const modalComponents: Record<ModalType, ModalElement> = {
  [ModalType.SHARE_STORY]: ShareStory,
};
