class StorageManager {
  private static instance: StorageManager;
  private data: any = {};
  private localStorageAvailable: boolean = false;

  constructor() {
    // if (localStorage && localStorage.getItem) {
      this.localStorageAvailable = true;
    // }
  }

  public static getInstance() {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  get(key: string) {
    if (this.localStorageAvailable) {
      const dataFromLocalStorage = localStorage.getItem(key);
      if (dataFromLocalStorage) {
        return JSON.parse(dataFromLocalStorage);
      }
      return null;
    }
    return this.data[key];
  }

  set(key: string, data: any) {
    if (this.localStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(data));
    }
    this.data[key] = data;
  }

  remove(key: string) {
    if (this.localStorageAvailable) {
      localStorage.removeItem(key);
    }
    delete this.data[key];
  }
}

const storageManagerInstance = StorageManager.getInstance();
export { storageManagerInstance as StorageManager };