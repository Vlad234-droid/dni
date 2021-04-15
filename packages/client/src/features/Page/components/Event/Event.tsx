import React, { useState, FC } from 'react';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import { Event } from 'features/Event';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';

const NetworkPage: FC = (props) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.EVENT}`}
      renderMain={() => (
        <ImageWrapperProvider value={ref}>
          <>
            <PageHeader>
              <ImageWrapper ref={(newRef) => setRef(newRef)} />
            </PageHeader>
            <PageWrapper>
              <Event
                // @ts-ignore
                id={props.match.params.id}
              />
            </PageWrapper>
          </>
        </ImageWrapperProvider>
      )}
    />
  );
};

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default NetworkPage;
