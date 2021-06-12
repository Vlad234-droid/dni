import { ToastSkin, ToastVariant } from './types';
import * as C from '../components/ToasterSkinContent';

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
    Content: C.ContentExample,
    timeout: 10000,
  },
  [ToastSkin.ENTITY_CREATE_SUCCESS]: {
    variant: ToastVariant.SUCCESS,
    Content: C.ContentSuccessEntity,
    timeout: 5000,
  },
  [ToastSkin.ENTITY_CREATE_ERROR]: {
    variant: ToastVariant.ERROR,
    Content: C.ContentErrorEntity,
    timeout: 5000,
  },
  [ToastSkin.LINK_COPY_SUCCESS]: {
    variant: ToastVariant.SUCCESS,
    Content: C.ContentSuccessCopyLink,
    timeout: 5000,
  },
  [ToastSkin.INTERVAL_LIMIT]: {
    variant: ToastVariant.ERROR,
    Content: C.IntervalLimit,
    timeout: 4000,
  },
  [ToastSkin.WRONG_INTERVAL]: {
    variant: ToastVariant.ERROR,
    Content: C.WrongInterval,
    timeout: 4000,
  },
};

export { skins };
