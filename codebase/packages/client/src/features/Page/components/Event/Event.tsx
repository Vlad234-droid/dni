import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Event } from 'features/Event';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'event-page';
const IMAGE_WRAPPER_TEST_ID = 'mage-wrapper';

const EventPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BasePage
        renderMain={() => (
          <ImageWrapperProvider value={ref}>
            <>
              <PageHeader>
                <ImageWrapper
                  data-testid={IMAGE_WRAPPER_TEST_ID}
                  ref={(newRef) => setRef(newRef)}
                />
              </PageHeader>
              <PageWrapper>
                <Event id={parseInt(props.match.params.id, 10)} />
              </PageWrapper>
            </>
          </ImageWrapperProvider>
        )}
      />
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

export { TEST_ID, IMAGE_WRAPPER_TEST_ID };

export default EventPage;
