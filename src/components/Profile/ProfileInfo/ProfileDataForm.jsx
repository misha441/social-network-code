import React from 'react';
import s from "./ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/formControls/FormControls";
import {Contacts} from "./ProfileInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><button className={'buttonStyle'}>
                <FontAwesomeIcon className={s.profileIcon} icon={faSave} fixedWidth />
                save
            </button></div>
            <div>{props.error}</div>

            <div className={s.profileContacts__title}>Main Information :</div>
            <hr/>
            <div className={s.profileData}>
                <div>
                    <div><span>Full name:</span></div>
                    <div><Field component={Input} name={'fullName'} placeholder={'Full name'}  /></div>
                </div>
                <div><div><span>About Me:</span></div>
                    <div>
                        <Field component={Textarea}
                               name={'aboutMe'}
                               placeholder={'About Me'}  /></div>
                    </div>
                <div>
                    <div><span>Looking for a job : </span></div>
                    <div><Field component={Input} name={'lookingForAJob'} type={'checkbox'}  /></div>
                </div>
                <div>
                    <div><span>Looking for a job description:</span></div>
                    <div><Field component={Textarea}
                                name={'lookingForAJobDescription'}
                                placeholder={'Looking for a job description'}  /></div>
                </div>
            </div>

            <div className={s.profileContacts}>
                <div className={s.profileContacts__title}>Contact Information :</div>
                <hr/>
                <div className={s.profileData}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={
                            <Field component={Input} name={'contacts.' + key} placeholder={key} />
                        }/>
                    })}
                </div>
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;