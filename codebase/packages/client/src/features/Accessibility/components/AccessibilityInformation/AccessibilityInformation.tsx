import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

import { headingXL, headingMD, textXS } from 'styles';
import Media from 'styles/media';

const AccessibilityInformation: FC = () => (
  <Wrapper data-testid='accessibility-information'>
    <MainTile>Accessibility</MainTile>
    <Description>
      Diversity and Inclusion is committed to providing a website that is accessible to the widest possible audience. We
      actively work to ensure that this website is accessible and usable by people of all abilities.
    </Description>
    <Title>How to get the most accessible experience from this website</Title>
    <Description>
      Our website can be viewed on a range of different screen sizes and the size of text can be changed to suit
      different people.
    </Description>
    <Title>Changing settings</Title>
    <Description>
      Using your web browser, you can change the size of text on this website. You can also make other helpful changes
      in your browser, as well as within your computer generally. To find out what else you can do, we recommend that
      you read “Better Web Browsing: Tips for Customising Your Computer” (
      <Link href='https://www.w3.org/WAI/users/browsing' target='_blank'>
        www.w3.org/WAI/users/browsing
      </Link>
      ) from The World Wide Web Consortium (W3C) or visit ‘My Web My Way’ (
      <Link href='https://www.bbc.co.uk/accessibility/' target='_blank'>
        www.bbc.co.uk/accessibility/
      </Link>
      ).
    </Description>
    <Title>Contacting us</Title>
    <Description>
      We are always looking for ways to help people get the best experience from this website. If there is information
      you think should be included on this page, or if you experience any problem accessing the site then please contact
      us. Please note: for advice on what information to include when you{' '}
      <Link href='https://colleague-help.ourtesco.com/hc/en-us'>contact us</Link>, we recommend you read “Contacting
      organisations about inaccessible websites” (
      <Link href='https://www.w3.org/WAI/users/inaccessible' target='_blank'>
        www.w3.org/WAI/users/inaccessible
      </Link>
      ).
    </Description>
    <Title>Accessibility guidelines</Title>
    <Description>
      Our aim is to ensure that all pages of this website conform to level AA of the Web Content Accessibility
      Guidelines 2.0 (WCAG 2.0). These guidelines are the internationally recognised benchmark for building accessible
      websites. The Web Content Accessibility Guidelines explain how to make websites more accessible for people with
      disabilities. Conformity to these guidelines also makes websites more user friendly for all people.
    </Description>
    <Title>Web standards and technologies</Title>
    <Description>
      This website has been built to conform to W3C standards for HTML and CSS. These technologies are relied upon
      throughout the site. The site displays correctly in all popular web browsers, and will continue to work in older
      browsers. In addition this website uses JavaScript and PDFs. These technologies are not relied upon and the
      website works well without them.
    </Description>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 32px 16px;

  ${Media.tablet`
    padding: 32px;
  `}
`;

const MainTile = styled.h1`
  ${headingXL};
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 4px;
`;

const Title = styled.h3`
  ${headingMD};
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 4px;
`;

const Description = styled.p`
  ${textXS};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.grayscale};
`;

export default AccessibilityInformation;
