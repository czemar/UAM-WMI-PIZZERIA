import { IValidator } from '../interfaces/validator.interface';
import { IValidationErrors } from '../interfaces/validation-errors.interface';
import { ReactiveGroup } from './reactive-group.class';
import { IReactiveAbstract } from '../interfaces/reactive-abstract.interface';
import { mapValues, isString } from 'lodash-es';

export class ReactiveArray<T> {

  private _controls: IReactiveAbstract[] = [];
  private _validators: IValidator[] = [];
  private errors: IValidationErrors = null;
  private _parent: ReactiveGroup | ReactiveArray<any> | null;

  public get controls() {
    return this._controls;
  }

  public get parent(): ReactiveGroup | ReactiveArray<any> | null {
    return this._parent;
  }

  public get value(): any {
    return mapValues(this._controls, (ctrl: IReactiveAbstract) => ctrl.value);
  }

  constructor(controls: IReactiveAbstract[], validators?: IValidator[]) {
    this._controls = controls;
    this._validators = validators;

    this._controls.forEach((control) => {
      control.setParent(this);
    });
  }

  public addControl(control: IReactiveAbstract) {
    control.setParent(this);
    this._controls.push(control);
  }

  public addControls(controls: IReactiveAbstract[]) {
    for (const ctrl of controls) {
      this.addControl(ctrl);
    }
  }

  public setParent(group: ReactiveGroup | ReactiveArray<any> | null) {
    this._parent = group;
  }

  public get(path: string | string[]) {
    if (isString(path)) {
      path = path.split('.');
    }

    if (path.length === 1) {
      return this._controls[Number(path[0])];
    } else {
      path.shift();
      return (this._controls[Number(path[0])] as ReactiveGroup).get(path);
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

  public setValue(val: { [key: string]: any }) {
    Object.entries(val).forEach(([key, value]) => {
      this._controls[key].setValue(value);
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