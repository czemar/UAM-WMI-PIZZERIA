import { Service } from '../libs/service/service.class';
import { map } from 'rxjs/operators'; 
import { IIngredient } from '../interfaces/ingredient.interface';
import { HttpSubject } from '../libs/observables/http-subject.class';

export class IngredientsService extends Service {
  // --- Observables ---
  private readonly list$ = new HttpSubject<IIngredient[]>([]);

  /**
   * Returns list of ingredients from API
   */
  public list(): HttpSubject<IIngredient[]> {
    if (this.list$.idle) {
      this.list$.fetch('/api/ingredient');
    }
    return this.list$;
  }

  /**
   * Returns ingredients object based by id
   * @param id ingredient's id
   */
  public byId(id: string): HttpSubject<IIngredient> {
    return this.list().pipe(
      map((ingredients) =>
        ingredients.find((ingredient: IIngredient) => ingredient.id === id)
      )
    ) as unknown as HttpSubject<IIngredient>;
  }
}
