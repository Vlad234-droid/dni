import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Network } from 'features/Network';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';

const TEST_ID = 'network-page';

const NetworkPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BasePage
        renderMain={() => (
          <ImageWrapperProvider value={ref}>
            <div>
              <PageHeader>
                <ImageWrapper
                  data-testid='image-container'
                  ref={(newRef) => setRef(newRef)}
                />
              </PageHeader>
              <PageWrapper>
                <Network id={parseInt(props.match.params.id, 10)} />
              </PageWrapper>
            </div>
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

export { TEST_ID };

export default NetworkPage;
