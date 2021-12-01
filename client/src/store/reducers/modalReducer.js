import {
    SIGNUP_MODAL_ON, 
    SIGNIN_MODAL_ON, 
    MODAL_OFF} from '../actions/actionTypes'


const initialState = {
    isCreateModal: false,
    isSigninModal: false,
    isSignupModal: false,
}

const modalReducer = (prevState = initialState, action) => {
    let state;

    switch(action.type) {
        case SIGNUP_MODAL_ON:
            state = {...prevState, isSignupModal:true};
            break;
        case SIGNIN_MODAL_ON:
            state = {...prevState, isSigninModal:false};
            break;
        case MODAL_OFF:
            state = {...initialState};
            break;
        default:
            state={...initialState};
    }
    return state;
};

export default modalReducer;

