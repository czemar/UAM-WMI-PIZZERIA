import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Service } from '../libs/service/service.class';
import {
  IPizza,
  IPizzaWithIngredients,
} from '../interfaces/pizza.interface';
import { HttpSubject } from '../libs/observables/http-subject.class';
import { IngredientsService } from './ingredients.service';
import { IIngredient } from '../interfaces/ingredient.interface';

export class PizzaService extends Service {
  // --- Dependencies ---
  private readonly ingredientsService: IngredientsService =
    IngredientsService.instance();

  // --- Observables ---
  private readonly list$ = new HttpSubject<IPizza[]>();

  /**
   * Returns list of pizzas from API
   */
  public list(): Observable<IPizza[]> {
    if (this.list$.idle) {
      this.list$.fetch('/api/pizza');
    }
    return this.list$;
  }

  /**
   * Returns pizza object based by id
   * @param id pizza's id
   */
  public byId(id: string) {
    return this.list().pipe(
      map((pizzas) => pizzas.find((pizza) => pizza.id === id))
    );
  }

  /**
   * Returns list of pizzas from API (joined with ingredients)
   */
  public listWithIngredients(): Observable<IPizzaWithIngredients[]> {
    return forkJoin({
      pizzas: this.list().pipe(take(1)),
      ingredients: this.ingredientsService.list().pipe(take(1)),
    }).pipe(
      map(({ pizzas, ingredients }) =>
        pizzas.map((pizza) => ({
          ...pizza,
          ingredients: ingredients.map(
            (ingredient) =>
              ingredients.find((i) => i.id === ingredient.id) ||
              ({} as IIngredient)
          ),
        }))
      )
    );
  }

  /**
   * Compares two pizzas objects
   * @param firstPizza first pizza object co compare
   * @param secondPizza second pizza object to compare
   * @returns {boolean} true if pizzas are the same or false otherwise
   */
  public compare(
    firstPizza: Partial<IPizza>,
    secondPizza: Partial<IPizza>
  ): boolean {
    return (
      firstPizza.id === secondPizza.id &&
      firstPizza.size === secondPizza.size
    );
  }
}
