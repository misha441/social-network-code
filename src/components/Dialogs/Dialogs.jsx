import React, {useEffect, useState} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/formControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import cn from 'classnames';
import Preloader from "../common/Preloader/Preloader";
import userPhoto from "../../assets/photos/user_icon.png";

const Dialogs = (props) => {

    let messageScroll = React.createRef();
    let state = props.dialogsPage;
    let messageSendDate = '';

    useEffect(() => {
        messageScroll.current.scrollTop = messageScroll.current.scrollHeight - messageScroll.current.clientHeight;
    }, [props.dialogsPage.messages]);

    let onSendMessage = (values) => {
        props.sendMessage(props.selectedUserId, values.newMessageBody);
    }

    let dateFunc = (m) => {
        if(props.dateFormattingToDate(m.addedAt) !== messageSendDate){
            messageSendDate = props.dateFormattingToDate(m.addedAt)
            return <div className={s.dialogDateStyle}><span>{props.dateFormattingToDate(m.addedAt)}</span></div>
        }
    }

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id}
                                                             name={d.userName}
                                                             id={d.id}
                                                             photo={d.photos.large}/>);
    let messagesElements = state.messages.map(m => <>{
        dateFunc(m)
    }
        <Message key={m.id}
                 message={m.body}
                 sender={m.senderId}
                 selectedUserPhoto={props.selectedUserPhoto}
                 authUserId={props.authUserId}
                 authUserPhotos={props.authUserPhotos}
                 dateFormattingToHours={props.dateFormattingToHours}
                 addedAt={m.addedAt}/>
    </>);


    return (
        <div className={s.dialogs}>
            <div className={cn(s.dialogsItem, 'scrollbarStyle')}>
                {dialogsElements}
            </div>
            <div className={s.messagesBlockWrapper}>
                {props.isFetching ? <Preloader/> : null}
                {props.selectedUserId
                    ? <div className={cn(s.selectedUserInfo)}>
                        <img src={props.selectedUserPhoto.small ? props.selectedUserPhoto.small : userPhoto} alt=""/>
                        <div>{props.selectedUserFullName}</div>
                    </div>
                    : <div className={cn(s.selectedUserInfo)}>
                        <img src={userPhoto} alt=""/>
                    </div>}

                <div ref={messageScroll} className={cn(s.messagesWrapper, 'scrollbarStyle')}>
                    {messagesElements}
                </div>
                <div className={s.sendingField}>

                    <AddMessageReduxForm onSubmit={onSendMessage}/>

                </div>
            </div>
        </div>
    )
}


const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.dialogs__sendMessageForm}>
            <div>
                <Field component={Textarea} name={'newMessageBody'} className={s.dialogs__textArea}
                       validate={[required, maxLength100]} placeholder={'Enter new message'}/>
            </div>
            <div className={s.dialogs__sendMessageFormButton}>
                <button className={s.dialogs__tsendButton}>SEND</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;