import React from 'react';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/lib/plugins/html-parser';
import styled from 'styled-components';
import Link from '@beans/link';

import ResponsiveImage from '@beans/responsive-image';
import { Box, Vertical } from '@energon-components/layout';

import { useMedia } from 'context/InterfaceContext';
import WistiaPlayer from '../WistiaPlayer';

type ElementType = keyof JSX.IntrinsicElements | React.ComponentType;

export type RichTextComponentProps = Omit<RichTextComponent, '__component' | 'id'>;
export type RichTextComponent = {
  __component: 'page-component.rich-text';
  text: string;
  id: number;
};

const StyledVideoContainer = styled(Box)`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const MarkdownContainer = styled(Box)`
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

const MarkdownRendererContainer = styled(Box)`
  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  h2 {
    font-size: 1.5em;
    margin: 0.75em 0;
  }
  h3 {
    font-size: 1.17em;
    margin: 0.83em 0;
  }
  h4 {
    margin: 1.12em 0;
  }
  h5 {
    font-size: 0.83em;
    margin: 1.5em 0;
  }
  h6 {
    font-size: 0.75em;
    margin: 1.67em 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  thead {
    background: rgb(243, 243, 243) none repeat scroll 0% 0%;
  }
  table thead tr {
    height: 43px;
    border: 1px solid rgb(198, 203, 209);
  }
  table th,
  table td {
    padding: 0px 25px;
    border-color: currentcolor rgb(198, 203, 209);
    border-style: none solid;
    border-width: 0px 1px;
    border-image: none 100% / 1 / 0 stretch;
  }
  table tbody tr {
    height: 54px;
  }
  table tr {
    border: 1px solid rgb(198, 203, 209);
  }
  code {
    border-radius: 3px;
    background-color: rgb(0, 43, 54);
  }
  p > code,
  pre > code,
  td > code {
    font-size: 13px;
    color: rgb(131, 148, 150);
  }
  blockquote {
    margin-top: 41px;
    margin-bottom: 34px;
    font-size: 16px;
    font-weight: 400;
    border-left: 5px solid #eee;
    font-style: italic;
    padding: 10px 20px;
    color: black;
  }
  blockquote > p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const getLinkHref = (url: string) => (url.indexOf('http') === -1 ? `https://${url}` : url);

export const supportedSourceHTMLTags = new Set(['img', 'u']);

export const RichTextRenderer = (props: RichTextComponentProps) => {
  const { isMobile, isLargeMobile } = useMedia();

  return (
    <Vertical fontSize={isMobile || isLargeMobile ? [16, 'px'] : [18, 'px']}>
      <MarkdownContainer>
        <MarkdownRenderer source={props.text} />
      </MarkdownContainer>
    </Vertical>
  );
};

export const MarkdownRenderer = ({ source }: { source: string }) => (
  <MarkdownRendererContainer>
    <ReactMarkdown
      source={source}
      // It's a temporary workaround until proper module
      // is available for embedding images
      escapeHtml={false}
      astPlugins={[
        htmlParser({
          isValidNode: ({ type, name }) => type === 'tag' && supportedSourceHTMLTags.has(name),
        }),
      ]}
      parserOptions={{
        commonmark: true,
      }}
      renderers={{
        link: ({ title, href, children }) =>
          title === 'video' ? (
            <StyledVideoContainer>
              <WistiaPlayer videoId={href} aspectRatio={16 / 9} />
            </StyledVideoContainer>
          ) : (
            <Link href={getLinkHref(href)}>{children}</Link>
          ),
        heading: (props) => (
          <Box color='tescoBlue' as={`h${props.level}` as ElementType}>
            {props.children}
          </Box>
        ),
        blockquote: (props) => (
          <Box color='tescoBlue' fontSize='fsm' marginY='fxs' inline={true}>
            <blockquote>{props.children}</blockquote>
          </Box>
        ),
        image: (props) => (
          <ResponsiveImage height={null} source={props.src} alt={props.alternativeText} title={props.alternativeText} />
        ),
      }}
    />
  </MarkdownRendererContainer>
);

export default MarkdownRenderer;
