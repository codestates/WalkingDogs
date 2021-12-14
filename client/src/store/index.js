import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore( reducers,composeEnhancer );

export default store;