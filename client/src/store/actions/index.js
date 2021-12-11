import {SIGN_IN, 
        SIGN_OUT,
        UPDATE_INFO,
        SIGNUP_MODAL_ON,
        SIGNIN_MODAL_ON,
        PASSWORDCHG_MODAL_ON,
        CREATE_GATHER_ROOM_MODAL_ON,
        CREATE_GATHER_ROOM_DETAIL_MODAL_ON,
        GATHER_CREW_MODAL_ON,
        SEARCH_GATHER,
        GATHER_INFO,
        MODAL_OFF,
        INIT_POSITION } from './actionTypes'

//AUTH ACTIONS
export const signinAction = (data) => ({
    type: SIGN_IN,
    payload: { ...data },
}) 

export const signoutAction = (data) => ({
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

export const passwordChgModalOnAction = (data) => ({
    type: PASSWORDCHG_MODAL_ON,
})

export const gatherCrewModalOnAction = (data) => ({
    type: GATHER_CREW_MODAL_ON,
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

//POS

export const initPosAction = (data) => ({
    type: INIT_POSITION,
    payload: {...data}
})