import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import Icon from '@beans/icon';

type Props = {
  to: string;
};
const BackLink = ({ to }: Props) => (
  <Link to={to}>
    <Button inverse>
      <Icon graphic='backwardLink' />
      Back
    </Button>
  </Link>
);

export default BackLink;
