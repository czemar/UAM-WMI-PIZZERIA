import { CartDialog } from './dialogs/cart-dialog/cart.dialog';
import { IRoute } from './interfaces/route.interface';
import { HomePage } from './pages/home-page/Home.page';
import { NotFoundPage } from './pages/not-found-page/NotFound.page';
import { PizzaDialog } from './dialogs/pizza-dialog/pizza.dialog';
import { SauceDialog } from './dialogs/sauce-dialog/sauce.dialog';

export const routes: IRoute[] = [
  { path: '/', page: HomePage, options: { exact: true } },
  { path: '/cart', page: HomePage, options: { dialog: CartDialog } },
  { path: '/sauce', page: HomePage, options: { dialog: SauceDialog } },
  { path: '/checkout', page: HomePage, options: { dialog: CartDialog } },
  { path: '/pizza/:pizzaId', page: HomePage, options: { dialog: PizzaDialog } },
  { path: '*', page: NotFoundPage },
];
