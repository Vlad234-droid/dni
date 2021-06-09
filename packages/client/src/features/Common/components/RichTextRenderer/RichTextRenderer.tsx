import React from 'react';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/lib/plugins/html-parser';
import styled from 'styled-components';
import Link from '@beans/link';

import ResponsiveImage from '@beans/responsive-image';
import { Box, Vertical } from '@energon-components/layout';

import { useMedia } from 'context/InterfaceContext';

type ElementType = keyof JSX.IntrinsicElements | React.ComponentType;

export type RichTextComponentProps = Omit<
  RichTextComponent,
  '__component' | 'id'
>;
export type RichTextComponent = {
  __component: 'page-component.rich-text';
  text: string;
  id: number;
};

const MarkdownContainer = styled(Box)`
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

const getLinkHref = (url: string) =>
  url.indexOf('http') === -1 ? `https://${url}` : url;

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
  <ReactMarkdown
    source={source}
    // It's a temporary workaround until proper module
    // is available for embedding images
    escapeHtml={false}
    astPlugins={[
      htmlParser({
        isValidNode: ({ type, name }) =>
          type === 'tag' && supportedSourceHTMLTags.has(name),
      }),
    ]}
    parserOptions={{
      commonmark: true,
    }}
    renderers={{
      link: (props) => (
        <Link href={getLinkHref(props.href)}>{props.children}</Link>
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
      image: (props) => <ResponsiveImage height={null} source={props.src} />,
    }}
  />
);

export default MarkdownRenderer;
