import React from 'react';
import { Component } from 'react';
import { routes } from '../../routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IRoute } from '../../interfaces/route.interface';
import { DialogService } from '../../services/dialog.service';

export class RouterOutlet extends Component {

  private dialogService: DialogService = DialogService.instance();

  onRouteChanged(route: IRoute) {
    if (!route.options) return;

    const { dialog } = route.options;

    if (dialog) {
      this.dialogService.open(dialog);
    }
  }

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
              render={(props) => {
                this.onRouteChanged(route);
                return <route.page { ...props } />;
              }}
            />
          ))}
        </Switch>
      </>
    );
  }
}
