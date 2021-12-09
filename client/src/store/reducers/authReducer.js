import { SIGN_IN, SIGN_OUT, UPDATE_INFO } from "../actions/actionTypes";

const initialState = {
    id:'',
    isLogin: false,
    email: '',
    username: '',
    image:'',
    breed:'',
    gender:'',
}


const authReducer = (prevState = initialState, action) => {
    let state;

    switch(action.type) {
        case SIGN_IN: 
            state = {
                ...prevState,
                isLogin: true, 
                ...action.payload,
            };
            break;
        case SIGN_OUT:
                state = {...initialState};
                break;
        case UPDATE_INFO:
            state={
                ...prevState,
                image: action.payload.data.image,
                username: action.payload.data.username,
                gender: action.payload.data.gender,
                breed: action.payload.data.breed,
            }
            break;
        default:
            state={...prevState};
    }
    return state;
}

export default authReducer;