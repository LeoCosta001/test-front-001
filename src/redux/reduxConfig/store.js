import { createStore } from 'redux';
import Reducers from './reducers/combineReducers';

const store = createStore(Reducers);

export default store;
