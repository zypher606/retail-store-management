import {
  PRODUCT_FETCH_ALL,
  PRODUCT_FETCH_ALL_SUCCESS,
  PRODUCT_FETCH_ALL_ERROR,
} from "./Types";
import { StorageManager } from "../../utilities";
import { createAction } from '@reduxjs/toolkit';
import { ActionDispatcher } from "../ActionDispatcher/ActionDispatcher";

export function productFetchAll() {
  return ActionDispatcher.getInstance().dispatch({
    type: PRODUCT_FETCH_ALL,
  });
}

export function productFetchAllSuccess(response: any) {
  return {
    type: PRODUCT_FETCH_ALL_SUCCESS,
    response,
  };
}

export function productFetchAllError(error: any) {
  return {
    type: PRODUCT_FETCH_ALL_ERROR,
    error,
  };
}