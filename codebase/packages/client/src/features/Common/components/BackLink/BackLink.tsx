import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  to: string;
  text?: string;
};

const BackLink: FC<Props> = ({ to, text = 'Back' }) => (
  <Link to={to}>
    <Button inverse data-testid='back-button'>
      <Icon graphic='backwardLink' data-testid='back-icon' />
      {text}
    </Button>
  </Link>
);

export default BackLink;
