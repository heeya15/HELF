import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/index";
import rootSaga from "./sagas/index";
import { createBrowserHistory } from "history";
import createSagaMiddlware from "redux-saga";
export default function configureStore() {
  const customHistory = createBrowserHistory();
  const sagaMiddleware = createSagaMiddlware({
    context: {
      history: customHistory,
    },
  });
  const middlewares = [sagaMiddleware];
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return { store, customHistory };
}
