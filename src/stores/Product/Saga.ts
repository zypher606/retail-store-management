import { call, put } from "redux-saga/effects";
import { emailAdd
 } from "./Service";
import {
  productFetchAllSuccess,
  productFetchAllError,
} from "./Actions";
import { addProductPurchase, fetchAllProducts } from "../../helpers/private-api.helper";

export function* handleProductFetchAll({type, payload}: any): any {
  try {
    const response = yield call(fetchAllProducts);
    yield put(productFetchAllSuccess(response));
  } catch (error) {
    yield put(productFetchAllError(error));
  }
}