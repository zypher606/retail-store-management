import { combineReducers } from "redux";
// import user from './User/Reducer'; 
// import email from './Email/Reducer'; 
import product from './Product/Reducer';

const appReducer = combineReducers({
  // user,
  // email,
  product,
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
