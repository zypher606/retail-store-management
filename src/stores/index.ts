import createSagaMiddleWare from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from "./rootSaga";
import { connect } from "react-redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

const appState = {};
const sagaMiddleWare = createSagaMiddleWare();

let middlewares: any = [];

if (process.env.NODE_ENV === "development") {
  middlewares = [sagaMiddleWare, logger, ];
} else {
  middlewares = [sagaMiddleWare];
}

const store = createStore(
  rootReducer,
  appState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleWare.run(rootSaga);

export const dispatch = store.dispatch;

const resolveMapStateToProps = (mapFn: any) => {
  return (state: any) => {
    const defaultMappedState = {
      user: state.user,
      email: state.email,
    };
    return { ...defaultMappedState, ...(mapFn && mapFn(state)) };
  };
};

const customConnect = (mapStateToProps?: any, mapDispatchToProps?: any) =>
  connect(resolveMapStateToProps(mapStateToProps), mapDispatchToProps);

export { customConnect as connect };
export default store;