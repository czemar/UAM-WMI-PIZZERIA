import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '../local-storage/local-storage.lib';

export class PersistentSubject<T> extends BehaviorSubject<T> {
  constructor(value: T, private _storageKey: string) {
    super(LocalStorage.getItem(_storageKey, value));
  }

  next(value: T) {
    LocalStorage.setItem(this._storageKey, value);
    super.next(value);
  }
}
