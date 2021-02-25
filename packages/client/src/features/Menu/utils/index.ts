import { css } from 'styled-components';
import {
  TypeCountFlexBasis,
  TypeAttachStyle,
  TypeAttachActiveStyle,
  TypeAttachActiveStyleIfMatch,
  TypeExcludeHiddenItems,
} from '../config/types';

const countFlexBasis: TypeCountFlexBasis = ({ amount }) => {
  return 100 / (amount + 1);
};

const attachStyle: TypeAttachStyle = ({ styles }) => {
  return css`
    ${styles}
  `;
};

const attachActiveStyle: TypeAttachActiveStyle = ({ stylesActive }) => {
  return css`
    ${stylesActive}
  `;
};

const attachActiveStyleIfMatch: TypeAttachActiveStyleIfMatch = ({
  path,
  to,
  stylesActive,
}) => {
  return path === to
    ? css`
        ${stylesActive}
      `
    : undefined;
};

const excludeHiddenItems: TypeExcludeHiddenItems = ({
  items,
  itemsHidden,
  itemsVisible,
}) => {
  return itemsVisible.map((element) => {
    delete itemsHidden[element];
    return items[element];
  });
};

export {
  countFlexBasis,
  attachStyle,
  attachActiveStyle,
  attachActiveStyleIfMatch,
  excludeHiddenItems,
};
