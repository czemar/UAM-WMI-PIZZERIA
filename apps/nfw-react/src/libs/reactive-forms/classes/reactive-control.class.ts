import { IValidator } from '../interfaces/validator.interface';
import { IValidationErrors } from '../interfaces/validation-errors.interface';
import { BehaviorSubject } from 'rxjs';
import { ReactiveGroup } from './reactive-group.class';
import { ISetValueOptions } from '../interfaces/set-value-options.interface';
import { ReactiveArray } from './reactive-array.class';

export class ReactiveControl<T> {

  private _value: T;
  private _validators: IValidator[] = [];
  private _parent: ReactiveGroup | ReactiveArray<any> | null = null;
  private errors: IValidationErrors = null;
  private valueChanges$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  public get value(): T {
    return this._value;
  }

  public get parent(): ReactiveGroup | ReactiveArray<any> | null {
    return this._parent;
  }

  public get valueChanges() {
    return this.valueChanges$;
  }

  constructor(value: T = null, validators: IValidator[] = []) {
    this._value = value;
    this._validators = validators;
  }

  public setParent(group: ReactiveGroup | ReactiveArray<any> | null) {
    this._parent = group;
  }

  public setValue(value: T, options?: ISetValueOptions) {
    this._value = value;

    if (!options || options?.emitEvent) {
      this.valueChanges$.next(value);
    }
    
    this.validate();
  }

  public setValidators(validators: IValidator[]) {
    this._validators = validators;
  }

  public clearValidators() {
    this._validators = [];
  }

  public updateValueAndValidity() {
    this.validate();
  }

  public hasError(error: string) {
    return Boolean(this.errors[error]);
  }

  private validate(): IValidationErrors | null {
    const errors = {};
    this._validators.forEach(validator => {
      Object.assign(errors, validator(this.value));
    });
    const result = Object.keys(errors).length ? errors : null;
    this.errors = result;
    return result;
  }

}