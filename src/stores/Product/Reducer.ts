import {
  PRODUCT_FETCH_ALL,
  PRODUCT_FETCH_ALL_SUCCESS,
  PRODUCT_FETCH_ALL_ERROR,
} from "./Types";

interface IProductState {
  loading: boolean;
  error: any;
  productList: any[];
}

const initialState = {
  loading: false,
  error: null,
  productList: [],
};

interface IProductReducerAction {
  type:
    | typeof PRODUCT_FETCH_ALL
    | typeof PRODUCT_FETCH_ALL_SUCCESS
    | typeof PRODUCT_FETCH_ALL_ERROR;
  response?: any;
  error?: any;
}

export default function reducer(
  state: IProductState = initialState,
  { type, response, error }: IProductReducerAction
): IProductState {
  switch (type) {
    case PRODUCT_FETCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_FETCH_ALL_SUCCESS:
      return { ...state, productList: response.data };
    case PRODUCT_FETCH_ALL_ERROR:
      return { ...state, error: error };
    default:
      return { ...state };
  }
}
