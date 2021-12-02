import { combineReducers } from 'redux';
import authReducer from './authReducer'
import modalReducer from './modalReducer'
import gathReducer from './gathReducer';

const rootReducer = combineReducers({
    authReducer,
    modalReducer,
    gathReducer
})

export default rootReducer;