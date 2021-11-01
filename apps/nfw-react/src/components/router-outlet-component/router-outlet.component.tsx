import React, { Component } from 'react';
import { routes } from '../../routes';
import { Route, Switch } from 'react-router-dom';
import { IRoute } from '../../interfaces/route.interface';
import { DialogService } from '../../services/dialog.service';

export class RouterOutlet extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        { children }
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.options?.exact}
            >
              <route.page route={route} />
            </Route>
          ))}
        </Switch>
      </>
    );
  }
}
