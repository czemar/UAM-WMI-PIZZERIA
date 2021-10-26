export class Service {
  private static _instance: Service;

  public static instance<T>(): T {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance as T;
  }
}
