import { ToastSkin, ToastVariant } from './types';
import {
  ContentExample,
  ContentSuccessEntity,
  ContentErrorEntity,
} from '../components/ToasterSkinContent';

const skins: Record<
  ToastSkin,
  Partial<{
    variant: ToastVariant;
    title: string;
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
    title: 'Hello, World!',
    Content: ContentExample,
    timeout: 10000,
  },
  [ToastSkin.ENTITY_CREATE_SUCCESS]: {
    variant: ToastVariant.SUCCESS,
    title: 'Success',
    Content: ContentSuccessEntity,
    timeout: 5000,
  },
  [ToastSkin.ENTITY_CREATE_ERROR]: {
    variant: ToastVariant.ERROR,
    title: 'Error',
    Content: ContentErrorEntity,
    timeout: 5000,
  },
};

export { skins };
