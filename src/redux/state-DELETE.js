import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        profilePage : {
            posts : [
                {id: 1, message: 'Hi, how are you?', likesCount: 14},
                {id: 2, message: 'It\'s my life', likesCount: 50},
                {id: 2, message: 'Ha-ha-ha', likesCount: 21}
            ],
            newPostText : ''
        },
        dialogsPage : {
            dialogs :  [
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Igor'},
                {id: 3, name: 'Vanya'},
                {id: 4, name: 'Misha'}
            ],
            messages : [
                {id: 1, message: 'Hello world!!!!'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'I\'m good'}
            ],
            newMassageBody: ''
        },
        sidebar : {}
    },
    _callSubscriber() {
        console.log('dd');
    },

    getState() {
        return this._state
    },
    subscribe(observer)  {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action );
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action );
        this._state.sidebar = sidebarReducer(this._state.sidebar, action );

        this._callSubscriber(this._state);
    }
}



export default store;