import React, { FC } from 'react';
import { Route as ReactRoute, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';

import { routes } from '../config/routes';

console.log('routes', routes);

const Routes: FC = () => {
  return (
    <Switch>
      {routes.map(({ path, exact, Component }) => (
        <ReactRoute
          key={path}
          path={path}
          exact={exact}
          component={Component}
        />
      ))}
    </Switch>
  );
};

export default Routes;
