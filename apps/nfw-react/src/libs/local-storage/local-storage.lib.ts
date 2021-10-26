export class LocalStorage {
  public static getItem<T>(key: string, defValue: T) {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) {
      return defValue || null;
    } else if (item === '') {
      return '';
    } else {
      return JSON.parse(item);
    }
  }

  public static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
