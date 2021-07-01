import React from 'react';
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/photos/user_icon.png";

const DialogItem = (props) => {
    return(
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id} className={s.dialogUser}
                     activeClassName={s.active}>
                <div><img className={s.dialogsUserPhoto}
                          src={props.photo != null ? props.photo : userPhoto} alt=""/></div>
                {props.name}
            </NavLink>
        </div>
    )
}


export default DialogItem;