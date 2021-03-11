import { FlattenSimpleInterpolation } from 'styled-components';

type DefaultProps = {
  styles?: FlattenSimpleInterpolation;
};

type CellProps = {
  visible?: boolean;
  verticalBorders?: boolean;
  textAlign?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent';
  verticalAlign?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'middle'
    | 'top'
    | 'bottom'
    | string;
  cellWidth?: string;
};

type RowProps = {
  active?: boolean;
  clickable?: boolean;
  rowHeight?: string;
  backgroundColor?: Color;
};

type TableProps = {
  frame?: boolean;
};

enum Color {
  DARK = 'dark',
  LIGHT = 'light',
}

export type { DefaultProps, CellProps, RowProps, TableProps };
export { Color };
