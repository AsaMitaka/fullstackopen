import { combineReducers, configureStore } from '@reduxjs/toolkit';

import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
