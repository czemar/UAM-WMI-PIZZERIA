import { BehaviorSubject } from "rxjs"
import { Dialog } from "../libs/dialog/dialog.class"
import { Service } from "../libs/service/service.class"

export class DialogService extends Service {

  // -- Observables --
  private readonly openedDialog$: BehaviorSubject<typeof Dialog> = new BehaviorSubject<typeof Dialog>(null);

  public open(dialog: typeof Dialog) {
    this.openedDialog$.next(dialog);
  }

  public close() {
    this.openedDialog$.next(null);
  }

  public openedDialog() {
    return this.openedDialog$;
  }

}
