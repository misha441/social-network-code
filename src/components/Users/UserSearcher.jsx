import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import styles from "./users.module.css";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserSearcher = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.usersSearcherWrapper}>
            <Field component={Input} className={styles.inputSearch} name={'term'}
                   placeholder={'user name'} type={'text'} />
            <div>
                <button className={styles.usersSearchButton}>
                    <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} fixedWidth />
                    Search
                </button>
            </div>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(UserSearcher);

export default LoginReduxForm;

