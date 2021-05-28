import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Breadcrumb } from 'features/Common';
import { Event } from 'features/Event';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';
import { Page } from 'features/Page';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';

const TEST_ID = 'event-page';
const IMAGE_WRAPPER_TEST_ID = 'mage-wrapper';

const links = [
  {
    current: true,
    text: 'Event',
  },
];

const home = {
  href: `/${Page.EVENTS}`,
  text: 'Events',
};

const EventPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BasePage
        renderMain={() => (
          <ImageWrapperProvider value={ref}>
            <>
              <Breadcrumb links={links} home={home} />
              <PageImageWrapper
                renderImage={() => (
                  <ImageWrapper
                    data-testid={IMAGE_WRAPPER_TEST_ID}
                    ref={(newRef) => setRef(newRef)}
                  />
                )}
              >
                <Event id={parseInt(props.match.params.id, 10)} />
              </PageImageWrapper>
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
