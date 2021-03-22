import { css } from 'styled-components';

// Describe reusable styles for app headings
// 16px
export const headingXS = css`
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.heading.xs};
`;

// 20px
export const headingSM = css`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.heading.sm};
`;

// 24px
export const headingMD = css`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.heading.md};
`;

// 28px
export const headingLG = css`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: ${({ theme }) => theme.lineHeight.heading.lg};
`;

// 32px
export const headingXL = css`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${({ theme }) => theme.lineHeight.heading.xl};
`;
