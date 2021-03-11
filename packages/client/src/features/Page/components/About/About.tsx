import React, { FC } from 'react';

import { Page, PAGE_PREFIX } from 'features/Page';

import Content from './Content';
import BasePage from '../BasePage';

const About: FC = () => (
  <div data-testid={`${PAGE_PREFIX}${Page.ABOUT}`}>
    <BasePage renderMain={() => <Content />} />
  </div>
);

export default About;
