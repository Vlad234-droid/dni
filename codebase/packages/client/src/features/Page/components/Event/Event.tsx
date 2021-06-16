import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { ImageWrapperProvider, BreadcrumbWrapperProvider } from 'context';
import { Event } from 'features/Event';
import { GREY_COLOR } from 'styles';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';

const TEST_ID = 'event-page';
const IMAGE_WRAPPER_TEST_ID = 'image-wrapper';

const EventPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [imageRef, setImageRef] = useState<HTMLElement | null>(null);
  const [breadcrumbRef, setBreadcrumbRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BreadcrumbWrapperProvider value={breadcrumbRef}>
        <BasePage
          renderBreadcrumb={() => (
            <BreadcrumbWrapper data-testid='breadcrumb-wrapper' ref={(newRef) => setBreadcrumbRef(newRef)} />
          )}
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

const BreadcrumbWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;

  & .beans-breadcrumb__container {
    background-color: ${GREY_COLOR};
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export { TEST_ID, IMAGE_WRAPPER_TEST_ID };

export default EventPage;
