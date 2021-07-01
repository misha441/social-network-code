import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_MESSAGE = 'profile/DELETE_MESSAGE';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 14},
        {id: 2, message: 'It\'s my life', likesCount: 50},
        {id: 3, message: 'Ha-ha-ha', likesCount: 21}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_MESSAGE:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        case SAVE_PHOTO_SUCCESS:
            return {...state,profile: {...state.profile, photos: action.photos} }
        default :
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_MESSAGE, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    dispatch(setStatus(status))
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profileInfo) => async (dispatch, getState) => {
    let userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profileInfo)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let errorMessage = response.data.messages[0]
        if (errorMessage.includes('Invalid url format')){
            let errorElement = errorMessage.split(' ')[errorMessage.split(' ').length - 1]
                .split(')')[0].split('>')[1].toLowerCase()
            dispatch( stopSubmit('edit-profile', {'contacts': {[errorElement] : 'Invalid url format'}}) )
        } else {
            dispatch( stopSubmit('edit-profile', {_error: errorMessage}) )
        }

        return Promise.reject(errorMessage)
    }
}

export default profileReducer;