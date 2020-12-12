import React, { FC, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RouteOption } from './types';

const RouteWithSubRoutes: FC<RouteOption> = (routeProps) => {
  return (
    <Suspense fallback={routeProps.fallback || null}>
      <Route
        path={routeProps.path}
        render={(props) => {
          const comp = routeProps.component && (
            <routeProps.component {...props} routes={routeProps.routes} />
          );

          return routeProps.redirect ? (
            <Redirect to={routeProps.redirect} />
          ) : (
            comp
          );
        }}
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
