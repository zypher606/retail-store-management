import { all, fork } from "redux-saga/effects";
import { watchers } from "./rootWatchers";

export function* rootSaga(): any {
  yield all([fork(watchers)]);
}
