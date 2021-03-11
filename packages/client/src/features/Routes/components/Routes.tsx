import React, { FC } from 'react';
import { Route as ReactRoute, Switch } from 'react-router';

import { routes } from '../config/routes';

const Routes: FC = () => (
  <Switch>
    {routes.map(({ path, exact, Component }) => (
      <ReactRoute key={path} path={path} exact={exact} component={Component} />
    ))}
  </Switch>
);

export default Routes;