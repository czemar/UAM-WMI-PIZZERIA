import { map } from 'rxjs';
import { EStorageKeys } from '../enums/storage-keys.enum';
import { IPizza } from '../interfaces/pizza.interface';
import { PersistentSubject } from '../libs/observables/persistent-subject.class';
import { Service } from '../libs/service/service.class';
import { PizzaService } from './pizza.service';

export class CartService extends Service {
  // --- Dependencies ---
  private pizzaService: PizzaService = PizzaService.instance();

  // --- Observables ---
  private list$ = new PersistentSubject<IPizza[]>([], EStorageKeys.CART);

  /**
   * Add pizza to cart
   * @param pizza pizza to add to cart
   */
  public add(pizza: IPizza) {
    this.list$.next([...this.list$.value, pizza]);
  }

  /**
   * Remove pizza from cart
   * @param pizza pizza to remove from cart
   */
  public removeOne(pizza: IPizza) {
    const indexToRemove = this.list$.value.findIndex((pizzaInCart) =>
      this.pizzaService.compare(pizza, pizzaInCart)
    );

    const value = this.list$.value;
    value.splice(indexToRemove, 1);

    this.list$.next([...value]);
  }

  /**
   * Count the amount of pizzas in cart
   * @param pizza pizza type to count
   */
  public count() {
    return this.list$.pipe(
      map(pizzas => pizzas.length)
    )
  }
}
