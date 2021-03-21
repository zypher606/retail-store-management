import { all, takeLatest } from "redux-saga/effects";
import { 
  handleProductFetchAll
} from "./Saga";
import { 
  PRODUCT_FETCH_ALL
} from "./Types";

export default function productWatcher() {
  return all([
    takeLatest(PRODUCT_FETCH_ALL, handleProductFetchAll),
  ]);
}
