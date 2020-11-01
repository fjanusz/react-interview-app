import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from 'app/login/Login';
import { Products } from 'app/products/Products';

import { AppRoute } from './AppRoute.enum';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path={AppRoute.product}  component={Products} />
      <Route path={AppRoute.login} exact component={Login} />

      <Redirect to={AppRoute.login} />
    </Switch>
  );
};
