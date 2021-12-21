import { INIT_POSITION } from "../actions/actionTypes";

const initialState = {
    position: {
      latitude: 0,
      longitude: 0,
    },
}

const posReducer = (prevState = initialState, action) => {
    let state;
    switch(action.type) {
        case INIT_POSITION:
            state = {
                position: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                }
            };
            break;
        default:
            state = { ...prevState };
            break;
    }
    return state;
};

export default posReducer;