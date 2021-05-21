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
import { EmptyContainer, Error, Spinner } from 'features/Common';

import { byIdSelector, getOne } from '../../store';
import NetworkPartners from './NetworkPartners';
import NetworkHeader from './NetworkHeader';
import { Wrapper, Content, LeftContent, RightContent } from './styled';
import * as net from 'net';

const TEST_ID = 'network';

type Props = {
  id: number;
};

const Network: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(id));
  const { partners, description, title, image, contact } = network || {};
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [infoPanelType, setInfoPanelType] = useState(InfoPanelType.INFO);
  const { loading, error } = useStore((state) => state.networks);
  const imageWrapperEl = useImageWrapper();
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

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
    if (error) return <Error errorData={{ title: error }} />;

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
            <ResponsiveImage
              key={id}
              alt={image?.alternativeText}
              src={image?.url}
              fallbackSizeRatio='57%'
              objectFit='cover'
            />,
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
            //@ts-ignore
            content={
              isJoined
                ? [
                    'Just to know you better, please fill “This is me” survey. Your personal information won’t be disclosed.',
                  ]
                : [description]
            }
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
