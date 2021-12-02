import {SEARCH_GATHER} from '../actions/actionTypes';


const initialState = {
    conditions: {
        place:'',
        date:'',
        time:'',
    },
    gatherings: [],
}


const gathReducer = (prevState = initialState, action) => {
    let state;
    switch(action.type) {
        case SEARCH_GATHER:
            state = { 
                conditions: {
                place:action.payload.place?.placeName || "",
                date: action.payload.date?.date|| "",
                time:action.payload.time?.time|| "",
                formatPlace: 
                `${action.payload.conditions?.placeName}` || "",
                formatDate: 
                `${action.payload.conditions?.date?.split('-')[0]}년 ${
                    action.payload.conditions?.date?.split('-')[1]}월
                ${action.payload.conditions?.date?.split('-')[1]}일` || "",
            },
                gatherings: action.payload.gatherings,
            };
                break;
            default:
                state = {...prevState};
    }
    return state;
};

export default gathReducer;