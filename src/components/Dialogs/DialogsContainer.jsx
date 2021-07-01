import React from 'react';
import {
    getFriends,
    getMessages,
    sendMessage,
    sendMessageCreator,
    setMessages,
    setSelectedUserId
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class DialogsContainer extends React.Component{

    refreshProfile () {
        let userId = this.props.match.params.userId;
        if(userId) {
            this.props.getMessages(userId);
        }
    }

    componentDidMount(){
        this.props.getFriends()
        this.refreshProfile()
    }

    componentWillUnmount(){
        this.props.setSelectedUserId(null)
        this.props.setMessages([])
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    dateFormattingToHours = (date) => {
        const splittedTime = date.split('T')[1].split(':')
        return splittedTime[0]+':'+splittedTime[1]
    }
    dateFormattingToDate = (date) => {
        return date.split('T')[0].split('-').reverse().join('.')
    }

    render(){
        return <Dialogs {...this.props} dateFormattingToHours={this.dateFormattingToHours}
                        dateFormattingToDate={this.dateFormattingToDate} />
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        pageSize: state.dialogsPage.pageSize,
        selectedUserId: state.dialogsPage.selectedUserId,
        selectedUserPhoto: state.dialogsPage.selectedUserPhoto,
        selectedUserFullName: state.dialogsPage.selectedUserFullName,
        authUserId: state.auth.id,
        authUserPhotos: state.auth.photos,
        isFetching: state.dialogsPage.isFetching
    }
}


export default compose(
    connect(mapStateToProps, {sendMessageCreator, getFriends,
        getMessages, sendMessage, setSelectedUserId, setMessages}),
    withAuthRedirect
)(DialogsContainer);