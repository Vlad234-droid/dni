import { createGlobalStyle } from 'styled-components';
import { Theme } from '@beans/types';

// describe app global styles here
export default createGlobalStyle<{
  theme: Theme;
}>`
  /* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.text};
    font-weight: ${({ theme }) => theme.fontWeight.text};
    font-size: ${({ theme }) => theme.fontSize.xs};
    line-height: ${({ theme }) => theme.lineHeight.text.xs};
    color: ${({ theme }) => theme.colors.base};
    
    //remove extra scroll on mobile 
    height: calc(100vh - calc(100vh - 100%));
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
  
  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  // to be over everything and header
  .beans-modal__mask {
    z-index: 1001 !important;
  }
  
  #share-story.beans-modal__modal-container {
    min-width: 95vw;
    max-width: 95vw;
  }
`;
