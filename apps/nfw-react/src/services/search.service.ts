import { BehaviorSubject } from 'rxjs';
import { Service } from '../libs/service/service.class';

export class SearchService extends Service {

  // -- Observables --
  private readonly search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getSearch() {
    return this.search$;
  }

  public setSearch(str: string) {
    this.search$.next(str);
  }

  public clearSearch() {
    this.search$.next('');
  }

  public compare(str1: string, str2: string) {
    return (str1 || '').toLowerCase().includes((str2 || '').toLowerCase());
  }

}