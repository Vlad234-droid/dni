import { ToastSkin, ToastVariant } from './types';
import {
  ContentExample,
  ContentSuccessEntity,
  ContentErrorEntity,
  ContentSuccessCopyLink,
} from '../components/ToasterSkinContent';

const skins: Record<
  ToastSkin,
  Partial<{
    variant: ToastVariant;
    Content: (
      props: Partial<{
        id: number | string;
      }>,
    ) => JSX.Element;
    timeout: number;
  }>
> = {
  [ToastSkin.EXAMPLE]: {
    variant: ToastVariant.INFORMATION,
    Content: ContentExample,
    timeout: 10000,
  },
  [ToastSkin.ENTITY_CREATE_SUCCESS]: {
    variant: ToastVariant.SUCCESS,
    Content: ContentSuccessEntity,
    timeout: 5000,
  },
  [ToastSkin.ENTITY_CREATE_ERROR]: {
    variant: ToastVariant.ERROR,
    Content: ContentErrorEntity,
    timeout: 5000,
  },
  [ToastSkin.LINK_COPY_SUCCESS]: {
    variant: ToastVariant.SUCCESS,
    Content: ContentSuccessCopyLink,
    timeout: 5000,
  },
};

export { skins };
