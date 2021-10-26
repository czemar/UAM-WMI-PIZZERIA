import { IRoute } from './interfaces/route.interface';
import { HomePage } from './pages/home-page/Home.page';
import { NotFoundPage } from './pages/not-found-page/NotFound.page';

export const routes: IRoute[] = [
  { path: '/', page: HomePage, options: { exact: true } },
  { path: '/cart', page: HomePage },
  // { path: '/menu', page: MenuPage },
  { path: '*', page: NotFoundPage },
];
