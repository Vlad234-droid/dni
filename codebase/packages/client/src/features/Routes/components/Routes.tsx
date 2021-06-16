import React, { FC } from 'react';
import { Route as ReactRoute, Switch, Redirect } from 'react-router';

import { usePermission } from 'features/Auth';
import { Action, buildAction } from 'features/Action';
import { routes } from '../config/routes';

const Routes: FC = () => {
  return (
    <Switch>
      {routes.map(({ page, path, exact, Component }) => {
        const hasPermission = usePermission(buildAction(page, Action.VISIT));

        if (hasPermission) {
          return <ReactRoute key={path} path={path} exact={exact} component={Component} />;
        }
      })}
      <Redirect from='*' to='/404' />
    </Switch>
  );
};

export default Routes;
