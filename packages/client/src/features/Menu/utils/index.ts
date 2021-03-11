import { MenuItem, VisiblePages } from '../config/types';
import { Page } from 'features/Page';

const makeDefault = (): { visible: MenuItem[]; hidden: MenuItem[] } => ({
  visible: [],
  hidden: [],
});

// TODO need refactoring
export const configureMenuItems = (
  items: Record<VisiblePages, MenuItem>,
  visible: Page[],
) => {
  return Object.keys(items).reduce((acc, key) => {
    if (visible.includes(key as VisiblePages)) {
      acc.visible.push(items[key as VisiblePages]);
    } else {
      acc.hidden.push(items[key as VisiblePages]);
    }
    return acc;
  }, makeDefault());
};
