import React, { FC } from 'react';

import { Page } from 'features/Page';

import Content from './Content';
import BasePage from '../BasePage';

const About: FC = () => (
  <div data-testid={Page.ABOUT}>
    <BasePage
      renderCenter={() => <Content />}
      withBackground={false}
      withPaddings={false}
    />
  </div>
);

export default About;
