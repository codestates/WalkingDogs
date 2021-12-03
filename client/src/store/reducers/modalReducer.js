import {
    CREATE_GATHER_ROOM_MODAL_ON,
    CREATE_GATHER_ROOM_DETAIL_MODAL_ON,
    SIGNUP_MODAL_ON, 
    SIGNIN_MODAL_ON, 
    MODAL_OFF} from '../actions/actionTypes'


const initialState = {
    isCreateGatherModal: false,
    isCreateDetailModal:false,
    isSigninModal: false,
    isSignupModal: false,
    currentGatherInfo:{},
}

const modalReducer = (prevState = initialState, action) => {
    let state;

    switch(action.type) {
        case CREATE_GATHER_ROOM_MODAL_ON:
            state = {...prevState, isCreateGatherModal:true};
            break;
        case CREATE_GATHER_ROOM_DETAIL_MODAL_ON:
            state ={...prevState, isCreateDetailModal: true, currentGatherInfo: action.payload};
            break;
        case SIGNUP_MODAL_ON:
            state = {...prevState, isSignupModal:true};
            break;
        case SIGNIN_MODAL_ON:
            state = {...prevState, isSigninModal:true};
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

