import {SIGN_IN, 
        SIGN_OUT,
        UPDATE_INFO,
        SIGNUP_MODAL_ON,
        SIGNIN_MODAL_ON,
        CREATE_GATHER_ROOM_MODAL_ON,
        CREATE_GATHER_ROOM_DETAIL_MODAL_ON,
        SEARCH_GATHER,
        GATHER_INFO,
        MODAL_OFF } from './actionTypes'

//AUTH ACTIONS
export const signinAction = (data) => ({
    type: SIGN_IN,
    payload: { ...data },
}) 

export const singoutAction = (data) => ({
    type: SIGN_OUT,
})

export const updateInfoAction = (data) => ({
    type: UPDATE_INFO,
    payload: {
        ...data 
    },
});

//MODAL ACTIONS

export const createGatherRoomModalOnAction = (data) => ({
    type: CREATE_GATHER_ROOM_MODAL_ON,
})

export const createGatherRoomDetailModalOnAction = (gathering) => ({
    type: CREATE_GATHER_ROOM_DETAIL_MODAL_ON,
    payload: {...gathering}
})

export const signupModalOnAction = (data) => ({
    type:SIGNUP_MODAL_ON,
})

export const signinModalOnAction = (data) => ({
    type: SIGNIN_MODAL_ON,
})

export const modalOffAction = (data)=> ({
    type:MODAL_OFF,
})

//GATHER 

export const searchGatherAction = ({conditions, gatherings}) => ({
    type: SEARCH_GATHER,
    payload: {conditions, gatherings}
})

export const gatherInfoAction = ({data}) => ({
    type: GATHER_INFO,
    payload: {...data}
})