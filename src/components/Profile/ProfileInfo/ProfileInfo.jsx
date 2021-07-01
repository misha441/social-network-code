import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userIcon from '../../../assets/photos/user_icon.png';
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import ProfileDataForm from "./ProfileDataForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import MyPostsContainer from "../MyPosts/MyPostsContainer";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    ;


    const onMainPhotoSelected = (e) => {
        if (e.target.files[0]){
            if (e.target.files[0].length != 0) {
                props.savePhoto(e.target.files[0])
            }
        }

    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.descriptionBlock__avatarBlockWrapper}>
                    <div className={s.descriptionBlock__avatarBlock}>
                        <div >
                            <div className={s.descriptionBlock__imageWrapper}></div>
                                <img src={props.profile.photos.large || userIcon}
                                     className={s.descriptionBlock__image}
                                     alt='' />
                        </div>
                        <div className={s.descriptionBlock__fullName}>{props.profile.fullName}</div>

                        <div>{props.isOwner && <input type={'file'}
                                                      className={s.changePhotoButton}
                                                      onChange={onMainPhotoSelected}/>}</div>
                    </div>
                </div>
                <div>
                    <div className={s.descriptionBlock__Info}>
                        <div className={s.descriptionBlock__mainInfo}>
                            <div className={s.descriptionBlock__fullName}>{props.profile.fullName}</div>
                            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
                        </div>
                        {editMode
                            ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                            : <ProfileData goToEditMode={() => {
                                setEditMode(true)
                            }}
                                           profile={props.profile}
                                           isOwner={props.isOwner}/>
                        }

                    </div>
                    <MyPostsContainer />
                </div>


            </div>
        </div>
    );
}

const ProfileData = (props) => {
    return <div>
        {props.isOwner && <div>
            <button className={'buttonStyle'} onClick={props.goToEditMode}>
                <FontAwesomeIcon className={s.profileIcon} icon={faEdit} fixedWidth />
                edit
            </button>
        </div>}

        <div className={s.profileContacts__title}>Main Information :</div>
        <hr/>
        <div className={s.profileData}>
            <div>
                <div><span>AboutMe :</span></div>
                <div className={s.profileData__userInfo}>{props.profile.aboutMe}</div>
            </div>
            <div>
                <div><span>Looking for a job :</span></div>
                <div className={s.profileData__userInfo}>{props.profile.lookingForAJob ? 'yes' : 'no'}</div>
            </div>
            <div>
                <div><span>Looking for a job description :</span></div>
                <div className={s.profileData__userInfo}>
                    {props.profile.lookingForAJob && props.profile.lookingForAJobDescription}
                </div>
            </div>

        </div>
        <div className={s.profileContacts}>
            <div className={s.profileContacts__title}>Contact Information :</div>
            <hr/>
            <div className={s.profileData}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
            </div>
        </div>
    </div>
}

export const Contacts = ({contactTitle, contactValue}) => {
    return <div><div><span>{contactTitle} : </span></div> <div className={s.profileData__userInfo}>{contactValue}</div></div>
}

export default ProfileInfo;