import {SEARCH_GATHER, GATHER_INFO} from '../actions/actionTypes';


const initialState = {
    conditions: {
        username: '',
        place:'',
        date:'',
        time:'',
        content:'',
        totalNum:null,
    },
    gatherings: [],
}


const gathReducer = (prevState = initialState, action) => {
    let state;
    switch(action.type) {
        case SEARCH_GATHER:
            state = { 
                conditions: {
                    username:action.payload.username?.username || "",
                    
                    place:action.payload.place?.placeName || "",
                    
                    date: action.payload.date?.date || "",
                    
                    time:action.payload.time?.time || "",
                    
                    content:action.payload.content?.content ||"",
                    
                    totalNum:Number(action.payload.conditions?.totalNum || null),
                
                    formatUsername: 
                    `${action.payload.conditions?.formatUsername}` || "",
                
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
            case GATHER_INFO:
                state={
                    ...prevState,
                    image: action.payload.image,
                    address: action.payload.address,
                    room_title:action.payload.room_title,



                    /*
                    latitude: roomInfo.latitude,
                    longitude: roomInfo.longitude,
                    address: roomInfo.address,
                    selected_dogs: [...roomInfo.selected_dogs],
                    room_title: roomInfo.room_title,
                    member_limit: roomInfo.member_limit,
                    meeting_time: roomInfo.meeting_time,
                    */ 
                }
                break;
            default:
                state = {...prevState};
    }
    return state;
};

export default gathReducer;