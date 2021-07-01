import React from 'react';
import s from "./../Dialogs.module.css";
import cn from 'classnames';
import userPhoto from "../../../assets/photos/user_icon.png";

const Message = (props) => {

    return (<div>
            {props.sender === props.authUserId
                ? <div className={cn(s.messageWrapper, s.yourMessage)}>
                    <div className={s.message}>
                        <div className={s.messageText} dangerouslySetInnerHTML={{ __html: props.message}}></div>
                        <span>{props.dateFormattingToHours(props.addedAt)}</span>
                    </div>
                    <div className={s.messageUserPhoto}>
                        <img src={props.authUserPhotos.small ? props.authUserPhotos.small : userPhoto} alt="" />
                    </div>
                </div>
                : <div className={s.messageWrapper}>
                    <div className={s.messageUserPhoto}>
                        <img src={props.selectedUserPhoto.small ? props.selectedUserPhoto.small : userPhoto} alt="" />
                    </div>
                    <div className={s.message}>
                        {props.message}
                        <span>{props.dateFormattingToHours(props.addedAt)}</span>
                    </div>
                </div>}
        </div>
    )
}

export default Message;