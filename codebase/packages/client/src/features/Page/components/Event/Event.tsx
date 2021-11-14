import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { ImageWrapperProvider, BreadcrumbWrapperProvider } from 'context';
import { Event } from 'features/Event';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';

const TEST_ID = 'event-page';
const IMAGE_WRAPPER_TEST_ID = 'image-wrapper';
const BREADCRUMB_WRAPPER_TEST_ID = 'breadcrumb-wrapper';

const EventPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [imageRef, setImageRef] = useState<HTMLElement | null>(null);
  const [breadcrumbRef, setBreadcrumbRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BreadcrumbWrapperProvider value={breadcrumbRef}>
        <BasePage
          renderBreadcrumb={() => <div data-testid={BREADCRUMB_WRAPPER_TEST_ID} ref={(newRef) => setBreadcrumbRef(newRef)} />}
          renderMain={() => (
            <ImageWrapperProvider value={imageRef}>
              <PageImageWrapper
                renderImage={() => (
                  <ImageWrapper data-testid={IMAGE_WRAPPER_TEST_ID} ref={(newRef) => setImageRef(newRef)} />
                )}
              >
                <Event id={parseInt(props.match.params.id, 10)} />
              </PageImageWrapper>
            </ImageWrapperProvider>
          )}
        />
      </BreadcrumbWrapperProvider>
    </div>
  );
};

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export { TEST_ID, IMAGE_WRAPPER_TEST_ID, BREADCRUMB_WRAPPER_TEST_ID };

export default EventPage;
