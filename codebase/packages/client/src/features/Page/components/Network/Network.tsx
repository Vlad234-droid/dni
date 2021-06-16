import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { GREY_COLOR } from 'styles';
import { Network } from 'features/Network';
import { BreadcrumbWrapperProvider, ImageWrapperProvider } from 'context';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';

const TEST_ID = 'network-page';

const NetworkPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [breadcrumbRef, setBreadcrumbRef] = useState<HTMLElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BreadcrumbWrapperProvider value={breadcrumbRef}>
        <BasePage
          renderBreadcrumb={() => (
            <BreadcrumbWrapper data-testid='breadcrumb-wrapper' ref={(newRef) => setBreadcrumbRef(newRef)} />
          )}
          renderMain={() => (
            <ImageWrapperProvider value={ref}>
              <PageImageWrapper
                renderImage={() => <ImageWrapper data-testid='image-container' ref={(newRef) => setRef(newRef)} />}
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
  width: 100%;
  left: 0;
  bottom: 0;
`;

export { TEST_ID };

export default NetworkPage;
