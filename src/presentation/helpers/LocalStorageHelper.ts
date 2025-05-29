/* eslint-disable @typescript-eslint/no-explicit-any */
export enum StorageKeys {
  FIRST_LOGIN = "first-login",
}

export default class LocalStorageHelper {
  static setItem(key: StorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: StorageKeys): any {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  static removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }
}
