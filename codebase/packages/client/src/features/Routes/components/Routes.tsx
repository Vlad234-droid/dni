import React, { FC } from 'react';
import { Route as ReactRoute, Switch, Redirect } from 'react-router';

import { routes } from '../config/routes';

// TODO: filter routes to render only available by role
const Routes: FC = () => (
  <Switch>
    {routes.map(({ path, exact, Component }) => (
      <ReactRoute key={path} path={path} exact={exact} component={Component} />
    ))}
    <Redirect from='*' to='/404' />
  </Switch>
);

export default Routes;