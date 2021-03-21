import productWatcher from './Product/Watcher';

export function* watchers(): any {
  yield productWatcher();
  // yield emailWatcher();
}
