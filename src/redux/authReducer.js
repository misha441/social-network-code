import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null,
    login: null,
    email: null,
    photos: {small: null, large: null},
    isAuth: false,
    captchaUrl : null
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_PHOTO:
            return {
                ...state,
                ...action.data
            }
        default :
            return state;
    }
}

export const setUserData = (id, login, email, isAuth, captchaUrl) => ({type: SET_USER_DATA,
    data: {id, login, email, isAuth,captchaUrl}});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}});
export const setAuthUserPhoto = (photos) => ({type: SET_USER_PHOTO, data: {photos}});



export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        const responseProfile = await profileAPI.getProfile(id)
        dispatch(setUserData(id, login, email, true, null));
        dispatch(setAuthUserPhoto(responseProfile.data.photos))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrlApi();
    console.log(response.data.url);
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}

export default usersReducer;