import {dialogsAPI, profileAPI, userAPI} from "../api/api";
import {setUserProfile} from "./profileReducer";

const SEND_MESSAGE = 'dialog/SEND-MESSAGE';
const SET_CURRENT_PAGE = 'dialogs/SET_CURRENT_PAGE'
const SET_DIALOGS_LIST = 'SET_DIALOGS_LIST';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_USER_ID = 'SET_USER_ID';
const SET_USER_INFO = 'SET_USER_INFO';
const TOGGLE_IS_FETCHING = 'dialogs/TOGGLE_IS_FETCHING';

let initialState = {
    selectedUserId: null,
    selectedUserPhoto: {small: null, large: null},
    selectedUserFullName: null,
    dialogs :  [ ],
    messages : [ ],
    currentPage: 1,
    pageSize: 10,
    isFetching: false
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id:5 , message: body}]
            }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.pageNumber}
        }
        case SET_DIALOGS_LIST:{
                return {...state, dialogs: action.dialogs}
        }
        case SET_MESSAGES: {
            return {...state, messages: action.messages}
        }
        case SET_USER_ID: {
            return {...state, selectedUserId: action.userId}
        }
        case SET_USER_INFO: {
            return {...state, selectedUserPhoto: action.photo, selectedUserFullName: action.fullName}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default :
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setDialogs = (dialogs) => ({type: SET_DIALOGS_LIST, dialogs});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});
export const setSelectedUserId = (userId) => ({type: SET_USER_ID, userId});
export const setSelectedUserPhoto = (photo, fullName) => ({type: SET_USER_INFO, photo, fullName});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getFriends = () =>async (dispatch) => {
    let response = await dialogsAPI.getAllDialogs()
    dispatch(setDialogs(response.data))
}

export const getMessages = (userId) =>async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(getSelectedUserInfo(userId));
    let response = await dialogsAPI.getMessages(userId)
    dispatch(toggleIsFetching(false));
    dispatch(setMessages(response.data.items))
    dispatch(setSelectedUserId(userId))
}

export const getSelectedUserInfo = (userId) =>async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setSelectedUserPhoto(response.data.photos, response.data.fullName));
}

export const sendMessage = (userId, message) =>async (dispatch) => {
    if(userId){
        let response = await dialogsAPI.sendMessage(userId, message)
        dispatch(getMessages(userId))
        dispatch(getFriends())
    }

}


export default dialogsReducer;