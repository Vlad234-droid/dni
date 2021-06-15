import React, { FC, useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import Loading from 'types/loading';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import { PostList, BY_NETWORK } from 'features/Post';
import { useImageWrapper } from 'context';
import { EmptyContainer, Error, Spinner, RichTextRenderer } from 'features/Common';
import defaultImage from 'assets/pride-logo.jpg';

import { byIdSelector, getOne } from '../../store';
import NetworkPartners from './NetworkPartners';
import NetworkHeader from './NetworkHeader';
import { Wrapper, Content, LeftContent, RightContent } from './styled';

const TEST_ID = 'network';
const ERROR_TITLE = 'Request ID not found';
const ERROR_MESSAGE = 'We can not find the network ID you are looking for, please try again.';
const JOINED_DESCRIPTION =
  'Just to know you better, please fill “This is me” survey. Your personal information won’t be disclosed.';

type Props = {
  id: number;
  renderBreadcrumb: (networkTitle: string) => void;
};

const Network: FC<Props> = ({ id, renderBreadcrumb }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(id));
  const { partners, description, title, image, contact } = network || {};
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [infoPanelType, setInfoPanelType] = useState(InfoPanelType.INFO);
  const { loading, error } = useStore((state) => state.networks);
  const imageWrapperEl = useImageWrapper();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    if (network) return;

    loadNetwork(id);
  }, [network, id]);

  const loadNetwork = (id: number) => dispatch(getOne({ id }));

  const handleJoin = useCallback(() => {
    setInfoPanelType(InfoPanelType.SUCCESS);
  }, []);

  const handleLeave = useCallback(() => {
    setInfoPanelType(InfoPanelType.INFO);
    setShowInfoPanel(true);
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
        {imageWrapperEl &&
          createPortal(
            <>
              {renderBreadcrumb(network!.title)}
              <ResponsiveImage
                key={id}
                alt={image?.alternativeText || 'Tesco'}
                src={image?.url || defaultImage}
                positioning='center'
                objectFit='cover'
                fallbackSizeRatio='57%'
              />
            </>,
            imageWrapperEl,
          )}
        <NetworkHeader
          id={id}
          //@ts-ignore
          title={title}
          //@ts-ignore
          email={contact}
          onLeave={handleLeave}
          onJoin={handleJoin}
        />
        {showInfoPanel && (
          <InfoPanel
            type={infoPanelType}
            infoLink='/'
            title={isJoined ? 'You have joined the Network!' : `Join ${title}`}
            renderContent={() => (isJoined ? <p>{JOINED_DESCRIPTION}</p> : <RichTextRenderer source={description!} />)}
            onClose={isJoined ? handleCloseInfoPanel : undefined}
          />
        )}
        <Content>
          <LeftContent>
            <PostList entityId={id} filter={BY_NETWORK} />
          </LeftContent>
          <RightContent>
            <NetworkPartners
              //@ts-ignore
              partners={partners}
              //@ts-ignore
              email={contact}
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
