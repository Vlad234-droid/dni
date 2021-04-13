import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Page, PAGE_PREFIX } from 'features/Page';
import { Network } from 'features/Network';
import { ImageWrapperProvider } from 'context/ImageWrapperProvider';

import BasePage from '../BasePage';
import PageHeader from '../PageHeader';
import PageWrapper from '../PageWrapper';

const NetworkPage: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  return (
    <BasePage
      data-testid={`${PAGE_PREFIX}${Page.NETWORK}`}
      renderMain={() => (
        <ImageWrapperProvider value={ref}>
          <div>
            <PageHeader>
              <ImageWrapper
                ref={(newRef) =>
                  // @ts-ignore
                  setRef(newRef)
                }
              />
            </PageHeader>
            <PageWrapper>
              <Network
                // @ts-ignore
                id={props.match.params.id}
              />
            </PageWrapper>
          </div>
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
