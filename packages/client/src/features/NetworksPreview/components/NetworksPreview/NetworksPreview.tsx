import React, { FC } from 'react';

import networks from '../../config/networks';
import NetworksPreviewItem from '../NetworksPreviewItem';
import Line from '../../assets/Line.svg';
import { List, IconsWrapper, Icon, Title } from './styled';

const NetworksPreview: FC = () => (
  <div data-testid='networks-preview'>
    <Title>Our colleague networks have 3 priorities for 2020/21</Title>
    <List>
      {networks.map((network) => (
        <NetworksPreviewItem key={network.id} network={network} />
      ))}
    </List>
    <IconsWrapper>
      <Icon src={Line} />
      <Icon src={Line} />
    </IconsWrapper>
    <Title>These priorities are common across all the networks</Title>
  </div>
);

export default NetworksPreview;
