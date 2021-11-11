import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Network } from 'features/Network';
import { BreadcrumbWrapperProvider, ImageWrapperProvider } from 'context';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';

const TEST_ID = 'network-page';
const IMAGE_WRAPPER_TEST_ID = 'image-wrapper';
const BREADCRUMB_WRAPPER_TEST_ID = 'breadcrumb-wrapper';

const NetworkPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [breadcrumbRef, setBreadcrumbRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BreadcrumbWrapperProvider value={breadcrumbRef}>
        <BasePage
          renderBreadcrumb={() => <div data-testid={BREADCRUMB_WRAPPER_TEST_ID} ref={(newRef) => setBreadcrumbRef(newRef)} />}
          renderMain={() => (
            <ImageWrapperProvider value={ref}>
              <PageImageWrapper
                renderImage={() => <ImageWrapper data-testid={IMAGE_WRAPPER_TEST_ID} ref={(newRef) => setRef(newRef)} />}
              >
                <Network id={parseInt(props.match.params.id, 10)} />
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
  width: 100%;
  left: 0;
  bottom: 0;
`;

export { TEST_ID, IMAGE_WRAPPER_TEST_ID, BREADCRUMB_WRAPPER_TEST_ID };

export default NetworkPage;
