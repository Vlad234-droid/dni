import { css } from 'styled-components';

// Describe reusable styles for app texts
// 14px
export const textXX = css`
  font-size: ${({ theme }) => theme.fontSize.xx};
  line-height: ${({ theme }) => theme.lineHeight.text.xx};
  font-weight: normal;
`;

// 16px
export const textXS = css`
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.text.xs};
  font-weight: normal;
`;

// 20px
export const textSM = css`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.text.sm};
  font-weight: normal;
`;

// TEXT BOLD
// 14px
export const textBoldXX = css`
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  ${textXX}
`;

// 16px
export const textBoldXS = css`
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  ${textXS};
`;

// 20px
export const textBoldSM = css`
  font-weight: ${({ theme }) => theme.fontWeight.heading};
  ${textSM}
`;
