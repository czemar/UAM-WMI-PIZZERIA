import { firstValueFrom, map } from 'rxjs';
import { PersistentSubject } from '../libs/observables/persistent-subject.class';
import { Service } from '../libs/service/service.class';
import {
  IPartialOrder,
} from '../interfaces/order.interface';
import { CartService } from './cart.service';
import { HttpSubject } from '../libs/observables/http-subject.class';
import { fromObject } from '../libs/form-data/form-data.lib';

export class OrderService extends Service {
  // --- Dependencies ---
  private cartService: CartService = CartService.instance();

  // --- Observables ---
  private readonly order$ = new HttpSubject<IPartialOrder>(null);

  /**
   * Proceed order
   */
  public async order() {
    const pizza = await firstValueFrom(this.cartService.pizzas());
    const total = await firstValueFrom(this.cartService.total());

    this.order$.next(null);

    this.order$.fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        pizza,
        total
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return this.order$;
  }

  public getOrder() {
    return this.order$;
  }
}
