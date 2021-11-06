import { ReactiveControl } from './reactive-control.class';
import { IValidator } from '../interfaces/validator.interface';
import isString from 'lodash-es/isString';
import mapValues from 'lodash-es/mapValues';
import { IReactiveAbstract } from '../interfaces/reactive-abstract.interface';
import { IValidationErrors } from '../interfaces/validation-errors.interface';
import { ReactiveArray } from './reactive-array.class';
import { BehaviorSubject } from 'rxjs';
import { ISetValueOptions } from '../interfaces/set-value-options.interface';

export class ReactiveGroup {

  private _controls: { [key: string]: IReactiveAbstract } = null;
  private _validators: IValidator[] = [];
  private errors: IValidationErrors = null;
  private _parent: ReactiveGroup | ReactiveArray<any> | null;
  private valueChanges$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public get controls() {
    return this._controls;
  }

  public get parent(): ReactiveGroup | ReactiveArray<any> | null {
    return this._parent;
  }

  public get value(): any {
    return mapValues(this._controls, ctrl => ctrl.value);
  }

  public get valueChanges() {
    return this.valueChanges$;
  }

  constructor(controls: { [key: string]: IReactiveAbstract }, validators?: IValidator[]) {
    this._controls = controls;
    this._validators = validators;

    Object.values(this._controls).forEach((control: ReactiveControl<any> | ReactiveGroup) => {
      control.setParent(this);
      control.valueChanges.subscribe(() => {
        this.valueChanges$.next(this.value);
      });
    });
  }

  public setParent(group: ReactiveGroup | ReactiveArray<any> | null) {
    this._parent = group;
  }

  public get(path: string | string[]) {
    if (isString(path)) {
      path = path.split('.');
    }

    if (path.length === 1) {
      return this._controls[path[0]];
    } else {
      path.shift();
      return (this._controls[path[0]] as ReactiveGroup).get(path);
    }
  }

  public hasError(error: string) {
    return Boolean(this.errors[error]);
  }

  public patchValue(val: { [key: string]: any }) {
    Object.entries(val).forEach(([key, value]) => {
      if (!this._controls[key]) return;

      if (this._controls[key] instanceof ReactiveGroup) {
        (this._controls[key] as ReactiveGroup).patchValue(value);
      } else {
        this._controls[key].setValue(value);
      }
    });
  }

  public setValue(val: { [key: string]: any }, options?: ISetValueOptions) {
    Object.entries(val).forEach(([key, value]) => {
      this._controls[key].setValue(value, options);
    });
  }

  public validate() {
    const errors = {};
    this._validators.forEach(validator => {
      Object.assign(errors, validator(this.value));
    });
    const result = Object.keys(errors).length ? errors : null;
    this.errors = result;
    return result;
  }

}
