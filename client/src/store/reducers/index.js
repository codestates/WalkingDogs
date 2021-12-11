import { combineReducers } from 'redux';
import authReducer from './authReducer'
import modalReducer from './modalReducer'
import gathReducer from './gathReducer';
import posReducer from './posReducer';

const rootReducer = combineReducers({
    authReducer,
    modalReducer,
    gathReducer,
    posReducer,
})

export default rootReducer;