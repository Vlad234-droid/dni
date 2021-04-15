import React, { FC, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';
import Post from 'features/Post';
import { useImageWrapper } from 'context';
import { normalizeImage } from 'utils/content';

import { byIdSelector, getOne } from '../../store';
import { Wrapper, Content, LeftContent, RightContent } from './styled';
import NetworkPartners from './NetworkPartners';
import NetworkHeader from './NetworkHeader';

type Props = {
  id: number;
};

// TODO: fix data for network and type
const Network: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(id));
  const { partners, description, title, image, contact } = network || {};
  const [isJoined, setIsJoined] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [infoPanelType, setInfoPanelType] = useState(InfoPanelType.INFO);
  const { isLoading } = useStore((state) => state.networks);
  const imageWrapperEl = useImageWrapper();

  useEffect(() => {
    if (network) return;

    loadNetwork(id);
  }, [network, id]);

  const loadNetwork = (id: number) => dispatch(getOne({ id }));

  const handleJoin = useCallback(() => {
    setIsJoined(true);
    setInfoPanelType(InfoPanelType.SUCCESS);
  }, []);

  const handleLeave = useCallback(() => {
    setIsJoined(false);
    setInfoPanelType(InfoPanelType.INFO);
    setShowInfoPanel(true);
  }, []);

  const handleCloseInfoPanel = useCallback(() => {
    setShowInfoPanel(false);
  }, [showInfoPanel]);

  if (!network && !isLoading)
    return <Content>{`There is no network with id ${id}`}</Content>;

  if (isLoading) return <Content>Loading network data...</Content>;

  // TODO: normaluize image before save to store
  return (
    <Wrapper>
      {imageWrapperEl &&
        createPortal(
          <ResponsiveImage
            key={id}
            //@ts-ignore
            alt={normalizeImage(image).alternativeText}
            //@ts-ignore
            src={normalizeImage(image).url}
            fallbackSizeRatio='57%'
            objectFit='cover'
          />,
          //@ts-ignore
          imageWrapperEl,
        )}
      <NetworkHeader
        //@ts-ignore
        title={title}
        //@ts-ignore
        email={contact}
        isJoined={isJoined}
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
          <Post />
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
    </Wrapper>
  );
};

export default Network;
