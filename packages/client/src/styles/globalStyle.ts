import { createGlobalStyle } from 'styled-components';
import { Theme } from '@beans/types';

// describe app global styles here
export default createGlobalStyle<{
  theme: Theme;
}>`
  html {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.text};
    font-weight: ${({ theme }) => theme.fontWeight.text};
    font-size: ${({ theme }) => theme.fontSize.xs};
    line-height: ${({ theme }) => theme.lineHeight.text.xs};
    color: ${({ theme }) => theme.colors.base};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.heading};
    font-weight: ${({ theme }) => theme.fontWeight.heading};
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
