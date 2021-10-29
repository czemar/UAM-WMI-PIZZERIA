import { environment } from "../../environments/environment";

export class Service {
  private static _instance: Service;

  public static instance<T>(): T {
    if (!this._instance) {
      this._instance = new this();
    }

    if (!environment.production) {
      if (!(window as any).services) (window as any).services = {};
      (window as any).services[this._instance.constructor.name] = this._instance;
    }

    return this._instance as T;
  }
}
