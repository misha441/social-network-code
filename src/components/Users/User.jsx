import React from 'react';
import styles from './users.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/photos/user_icon.png";
import s from "../Navbar/Navbar.module.css";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const User = (props) => {
    return (
        <div key={props.user.id} className={styles.userBlock}>
            <div>
                <div className={styles.usersPhoto__wrapper}>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto}
                             className={styles.usersPhoto}
                        alt='' />
                    </NavLink>
                    <div className={styles.userBlock__toDialogButton}>
                        <NavLink to={'/dialogs/' + props.user.id}>
                            <FontAwesomeIcon className={styles.usersMessageIcon} icon={faCommentDots} fixedWidth />
                        </NavLink>
                    </div>
                </div>

            </div>
            <div className={styles.userBlock__info}>
                <div>
                    <NavLink className={styles.userBlock__fullName} to={'/profile/' + props.user.id}>
                        <div>{props.user.name}</div>
                    </NavLink>
                    <div className={styles.userBlock__status}>{props.user.status}</div>
                </div>
                <div className={styles.followBtnWrapper}>
                    <div>{props.user.followed ?
                        <button disabled={props.UsersInFollowingProgress.some(id => id == props.user.id)}
                                className={styles.followBtn} onClick={() => {
                            props.unfollow(props.user.id)
                        }}>Unfollow</button> :
                        <button disabled={props.UsersInFollowingProgress.some(id => id == props.user.id)}
                                className={styles.followBtn} onClick={() => {
                            props.follow(props.user.id)
                        }}>Follow</button>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default User;