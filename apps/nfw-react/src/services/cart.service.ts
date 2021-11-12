import { map, Observable } from 'rxjs';
import { EStorageKeys } from '../enums/storage-keys.enum';
import { PersistentSubject } from '../libs/observables/persistent-subject.class';
import { Service } from '../libs/service/service.class';
import { PizzaService } from './pizza.service';
import { IPartialPizzaOrder, IPartialSauceOrder } from '../interfaces/order.interface';

export class CartService extends Service {

  // --- Dependencies ---
  private pizzaService: PizzaService = PizzaService.instance();

  // --- Observables ---
  private list$ = new PersistentSubject<(IPartialPizzaOrder | IPartialSauceOrder)[]>([], EStorageKeys.CART);

  /**
   * Add pizza or sauce to cart
   * @param element Item to add to cart
   */
  public add(element: IPartialPizzaOrder | IPartialSauceOrder) {
    this.list$.next([...this.list$.value, element]);
  }

  /**
   * Remove pizza from cart
   * @param pizza pizza to remove from cart
   */
  public removeOne(element: IPartialPizzaOrder | IPartialSauceOrder) {
    const indexToRemove = this.list$.value.findIndex((item) => {
      return (item as IPartialPizzaOrder).ingredients?.toString() === (element as IPartialPizzaOrder).ingredients?.toString()
      && item.id === element.id;
    });

    const value = this.list$.value;
    value.splice(indexToRemove, 1);

    this.list$.next([...value]);
  }

  /**
   * Count the amount of items in cart
   */
  public count() {
    return this.list$.pipe(
      map(pizzas => pizzas.length)
    )
  }

  /**
   * Returns list of pizzas in cart
   * @returns Observable of cart
   */
  public list() {
    return this.list$;
  }

  /**
   * Clear cart
   */
  public clear() {
    this.list$.next([]);
  }

  /**
   * Returns total price of cart
   * @returns Observable of total price
   */
  public total() {
    return this.list$.pipe(
      map(
        list => list.reduce(
          (sum: number, partial: IPartialPizzaOrder) => sum += partial.price,
          0
        )
      )
    )
  }

  public pizzas(): Observable<IPartialPizzaOrder[]> {
    return this.list$.pipe(
      map(list => {
        return list.filter(item => this.pizzaService.isPizza(item)) as IPartialPizzaOrder[]
      })
    );
  }

}
