import { createStore, combineReducers } from 'redux';
import TodoReducer from './todoReducer';

const rootReducer = combineReducers({ todos: TodoReducer });

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
