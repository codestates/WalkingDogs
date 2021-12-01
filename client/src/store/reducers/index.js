import { combineReducers } from 'redux';
import authReducer from './authReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
    authReducer,
    modalReducer
})

export default rootReducer;