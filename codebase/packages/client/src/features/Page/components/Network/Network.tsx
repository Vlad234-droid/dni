import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Breadcrumb from '@beans/breadcrumb';

import { Network } from 'features/Network';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';

import BasePage from '../BasePage';
import PageImageWrapper from '../PageImageWrapper';
import { Page } from '../../config/types';

const TEST_ID = 'network-page';

const home = {
  href: `/${Page.NETWORKS}`,
  text: 'Networks',
};

const NetworkPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  return (
    <div data-testid={TEST_ID}>
      <BasePage
        renderMain={() => (
          <ImageWrapperProvider value={ref}>
            <PageImageWrapper
              renderImage={() => <ImageWrapper data-testid='image-container' ref={(newRef) => setRef(newRef)} />}
            >
              <Network
                id={parseInt(props.match.params.id, 10)}
                renderBreadcrumb={(networkTitle) => (
                  <Breadcrumb
                    links={[
                      {
                        current: true,
                        text: `${networkTitle}`,
                      },
                    ]}
                    home={home}
                  />
                )}
              />
            </PageImageWrapper>
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
