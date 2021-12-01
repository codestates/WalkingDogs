import {SIGN_IN, 
        SIGN_OUT,
        UPDATE_INFO,
        SIGNUP_MODAL_ON,
        SIGNIN_MODAL_ON,
        CREATEROOM_MODAL_ON,
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
    payload: { ...data },
});

//MODAL ACTIONS

export const createroomModalOnAction = (data) => ({
    type: CREATEROOM_MODAL_ON,
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