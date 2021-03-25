import { ToastSkin, ToastVariant } from './types';
import { ContentExample } from '../components/ToasterSkinContent';

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
};

export { skins };
