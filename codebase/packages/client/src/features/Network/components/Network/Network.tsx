import React, { FC, useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';
import Breadcrumb from '@beans/breadcrumb';

import Loading from 'types/loading';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import { PostList, BY_NETWORK } from 'features/Post';
import { useBreadcrumbWrapper, useImageWrapper } from 'context';
import { EmptyContainer, Error, Spinner, RichTextRenderer } from 'features/Common';
import { getBackLink } from 'features/Page';
import { LINKS } from 'config/constants';
import defaultImage from 'assets/pride-logo.jpg';

import { byIdSelector, getOne } from '../../store';
import NetworkPartners from '../NetworkPartners';
import NetworkHeader from '../NetworkHeader';
import { Wrapper, Content, LeftContent, RightContent, DescriptionWrapper, DescriptionTitle } from './styled';

const TEST_ID = 'network';
const ERROR_TITLE = 'Request ID not found';
const ERROR_MESSAGE = 'We can not find the network ID you are looking for, please try again.';
const INFO_PANEL_TEXT =
  'Just to know you better, please fill “This is me” survey. Your personal information won’t be disclosed.';

type Props = {
  id: number;
};

const Network: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(id));
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [infoPanelType, setInfoPanelType] = useState(InfoPanelType.INFO);
  const { loading, error } = useStore((state) => state.networks);
  const imageWrapperEl = useImageWrapper();
  const breadcrumbWrapperEl = useBreadcrumbWrapper();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    if (network) return;

    loadNetwork(id);
  }, [network, id]);

  const loadNetwork = (id: number) => dispatch(getOne({ id }));

  const handleJoin = useCallback(() => {
    setInfoPanelType(InfoPanelType.SUCCESS);
    setShowInfoPanel(true);
  }, []);

  const handleLeave = useCallback(() => {
    setInfoPanelType(InfoPanelType.INFO);
    setShowInfoPanel(false);
  }, []);

  const handleCloseInfoPanel = useCallback(() => {
    setShowInfoPanel(false);
  }, [showInfoPanel]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: ERROR_TITLE, message: ERROR_MESSAGE }} />;

    if (!network && isLoading) return <Spinner height='500px' />;

    if (!network && loading === Loading.SUCCEEDED) {
      return (
        <Wrapper data-testid={TEST_ID}>
          <EmptyContainer description={`There is no network with id ${id}`} />
        </Wrapper>
      );
    }

    return (
      <>
        {breadcrumbWrapperEl &&
          createPortal(
            <Breadcrumb
              links={[
                {
                  current: true,
                  text: `${network!.title}`,
                },
              ]}
              home={{
                href: getBackLink(),
                text: 'Networks',
              }}
            />,
            breadcrumbWrapperEl,
          )}
        {imageWrapperEl &&
          createPortal(
            <ResponsiveImage
              key={id}
              alt={network!.image?.alternativeText || 'Tesco'}
              title={network!.image?.alternativeText}
              src={network!.image?.url || defaultImage}
              positioning='center'
              objectFit='cover'
              fallbackSizeRatio='57%'
            />,
            imageWrapperEl,
          )}
        <NetworkHeader
          id={id}
          title={network!.title}
          email={network!.contact}
          slug={network!.slug}
          onLeave={handleLeave}
          onJoin={handleJoin}
          events={network!.events}
        />
        {showInfoPanel ? (
          <InfoPanel
            type={infoPanelType}
            infoLink={LINKS.thisIsMeSurvey}
            title='You have joined the Network!'
            content={[INFO_PANEL_TEXT]}
            onClose={handleCloseInfoPanel}
          />
        ) : (
          <DescriptionWrapper>
            {!isJoined && <DescriptionTitle>{`Join ${network!.title}`}</DescriptionTitle>}
            <RichTextRenderer source={network!.description} />
          </DescriptionWrapper>
        )}
        <Content>
          <LeftContent>
            <PostList entityId={id} filter={BY_NETWORK} />
          </LeftContent>
          <RightContent>
            <NetworkPartners
              id={id}
              partners={network!.partners}
              email={network!.contact}
              onLeave={handleLeave}
              onJoin={handleJoin}
              events={network!.events}
            />
          </RightContent>
        </Content>
      </>
    );
  }, [error, loading, network, networks]);

  return <Wrapper data-testid={TEST_ID}>{memoizedContent}</Wrapper>;
};

export { TEST_ID };

export default Network;
