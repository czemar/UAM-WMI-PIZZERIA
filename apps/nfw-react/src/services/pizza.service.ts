import { forkJoin, Observable, catchError } from 'rxjs';
import { map, take, tap, filter } from 'rxjs/operators';
import { Service } from '../libs/service/service.class';
import {
  IPizza,
  IPizzaWithIngredients,
} from '../interfaces/pizza.interface';
import { HttpSubject } from '../libs/observables/http-subject.class';
import { IngredientsService } from './ingredients.service';
import { IIngredient } from '../interfaces/ingredient.interface';
import { httpJoin } from '../libs/observables/http-join.class';

export class PizzaService extends Service {

  // --- Dependencies ---
  private readonly ingredientsService: IngredientsService =
    IngredientsService.instance();

  // --- Observables ---
  private readonly list$ = new HttpSubject<IPizza[]>([]);

  /**
   * Returns list of pizzas from API
   */
  public list(): HttpSubject<IPizza[]> {
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
      map((pizzas) => pizzas.find((pizza: IPizza) => pizza.id === id))
    );
  }

  /**
   * Returns pizza object based by id (joined with ingredients)
   * @param id pizza's id
   */
  public byIdWithIngredients(id: string) {
    return this.listWithIngredients().pipe(
      map((pizzas) => pizzas.find((pizza: IPizzaWithIngredients) => pizza.id === id))
    );
  }

  /**
   * Returns list of pizzas from API (joined with ingredients)
   */
  public listWithIngredients(): Observable<IPizzaWithIngredients[]> {
    return httpJoin({
      pizzas: this.list().pipe(
        filter(list => list.length > 0),
        take(1)
      ),
      ingredients: this.ingredientsService.list().pipe(
        filter(list => list.length > 0),
        take(1)
      ),
    }).pipe(
      catchError(err => {
        throw err;
      }),
      map(({ pizzas, ingredients }) =>
        pizzas.map((pizza: IPizza) => ({
          ...pizza,
          ingredients: pizza.ingredients.map(
            (ingString: string) =>
              ingredients.find((ing: IIngredient) => ing.id === ingString) ||
              ({} as IIngredient)
          ),
        }))
      )
    );
  }

  /**
   * Compares two pizza objects
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
