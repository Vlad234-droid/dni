import React, { FC } from 'react';

import { MenuDesktop, MenuUpdates } from 'features/Menu';

const Content: FC = () => (
  <>
    <MenuDesktop />
    <MenuUpdates />
  </>
);

export default Content;
