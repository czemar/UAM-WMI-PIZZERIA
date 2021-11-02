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
import { ISauce } from '../interfaces/souce.interface';

export class SauceService extends Service {

  // --- Observables ---
  private readonly list$ = new HttpSubject<ISauce[]>([]);

  /**
   * Returns list of sauces from API
   */
  public list(): HttpSubject<ISauce[]> {
    if (this.list$.idle) {
      this.list$.fetch('/api/sauce');
    }
    return this.list$;
  }

  /**
   * Returns sauce object based by id
   * @param id sauce's id
   */
  public byId(id: string) {
    return this.list().pipe(
      map((sauces) => sauces.find((sauce: ISauce) => sauce.id === id))
    );
  }

}
