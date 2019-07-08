import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = compose(applyMiddleware(...middlewares));

const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
