import { Service } from "../libs/service/service.class";
import { DialogService } from './dialog.service';
import { IRoute } from '../interfaces/route.interface';
import { BehaviorSubject } from 'rxjs';
import { UrlParser } from 'url-params-parser';

export class ActivatedRouteService extends Service {

  // -- dependencies --
  private readonly dialogService: DialogService = DialogService.instance();

  // -- observables --
  private readonly route$: BehaviorSubject<IRoute> = new BehaviorSubject<IRoute>(null);

  public get params(): { [key: string]: string } {
    const urlParser = UrlParser(
      location.href,
      this.route$.value.path
    );
    return urlParser.namedParams;
  }

  public get activeRoute() {
    return this.route$.value;
  }

  private onRouteChanged(route: IRoute) {
    this.route$.next(route);

    if (!route.options) return;

    const { dialog } = route.options;

    if (dialog) {
      this.dialogService.open(dialog);
    } else {
      this.dialogService.close();
    }
  }

  public emitRouteChange(route: IRoute) {
    this.onRouteChanged(route);
  }

  public route() {
    return this.route$;
  }

}
