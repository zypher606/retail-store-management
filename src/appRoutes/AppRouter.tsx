import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteMappings, IRoute } from './RouteMappings';
// import { AppContainer } from "../AppContainer";

interface IAppRouter {
  authenticated: boolean;
}

export const AppRouter = ({ authenticated }: IAppRouter) => {

  return (
    <HashRouter>
      {/* <AppContainer> */}
        <Switch>
          {RouteMappings.map(
            ({ isProtected, component: Component, path }: IRoute) => {
              if (!authenticated && !isProtected)
                return (
                  <Route
                    key={path}
                    path={path}
                    exact
                    render={(props: any) => (
                      <Component authenticated={authenticated} {...props} />
                    )}
                  />
                );
              else {
                return (
                  <ProtectedRoute
                    key={path}
                    path={path}
                    exact
                    component={Component}
                    authenticated={authenticated}
                    isProtected={isProtected}
                  />
                );
              }
                
            }
          )}
        </Switch>
      {/* </AppContainer> */}
    </HashRouter>
  )
}