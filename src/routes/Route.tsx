import React from "react";
import {
  Route as ReactRouterRoute,
  RouteProps as ReactRouterProps,
  Redirect,
} from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRouterRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              // eslint-disable-next-line no-restricted-globals
              // state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
