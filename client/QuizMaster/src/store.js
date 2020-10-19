import { applyMiddleware, createStore } from 'redux'
import { RootReducer } from './reducers'
import thunk from 'redux-thunk'

import * as Redux from 'redux';

// Logger logs all states after actions
const logger = (store) => (next) => (action) => {
  console.log('ACTION:', action.type, action);
  let result = next(action);
  console.log('STATE AFTER ACTION:', action.type, store.getState());
  return result;
}

// Devtools REDUX extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

export const store = createStore(RootReducer, composeEnhancers(
  applyMiddleware(thunk, logger)
));