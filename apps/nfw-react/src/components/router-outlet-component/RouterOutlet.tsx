import React from 'react';
import { Component } from 'react';
import { routes } from '../../routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export class RouterOutlet extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.options?.exact}
            >
              <route.page />
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
}
