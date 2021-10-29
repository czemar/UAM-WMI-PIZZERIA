import { Dialog } from '../libs/dialog/dialog.class';
import { Page } from '../libs/page/page.class';

export interface IRoute {
  path: string;
  page: typeof Page;
  options?: IRouteOptions;
}

export interface IRouteOptions {
  exact?: boolean;
  dialog?: typeof Dialog;
}
