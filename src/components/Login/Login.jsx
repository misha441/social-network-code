import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import styles from './Login.module.css';
import {login} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import cn from 'classnames';
import s from "../Navbar/Navbar.module.css";
import {faKey, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const maxLength40 = maxLengthCreator(40)

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.loginInputWrapper}>
            email :
            <div className={styles.loginInputBlock}>
                <div>
                    <FontAwesomeIcon className={styles.loginIcon} icon={faUser} fixedWidth />
                    <Field component={Input} className={styles.loginInput} type={'text'} validate={[required,maxLength40]}
                           name={'email'} placeholder={'email'} />
                </div>
            </div>

        </div>
        <div className={styles.loginInputWrapper}>
            password :
            <div className={styles.loginInputBlock}>
                <div>
                    <FontAwesomeIcon className={styles.loginIcon} icon={faLock} fixedWidth />
                    <Field component={Input} className={styles.loginInput} validate={[required,maxLength40]} name={'password'}
                           placeholder={'password'} type={'password'}/>
                </div>
            </div>
        </div>
        <div className={styles.formCheckbox}>
            <Field component={Input} name={'rememberMe'} type={'checkbox'}/>remember me
        </div>
        {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
        <div>
            {props.captchaUrl && <img src={props.captchaUrl} alt=''/>}
            {props.captchaUrl &&
            <div className={styles.loginInputBlock}>
                <div>
                    <FontAwesomeIcon className={styles.loginIcon} icon={faKey} fixedWidth />
                    <Field name='captcha' className={styles.loginInput} component={Input} placeholder='Symbol from image' validate={[required]} />
                </div>
            </div>

            }
        </div>
        <div>
            <br/>
            <button className={styles.loginButton}>Login</button>
        </div>
        mdm04dp12m
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={styles.loginFormWrapper}>
            <div>
                <div className={styles.loginTitle}>Login</div>
                <div>
                    <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
                </div>
            </div>

        </div>)
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);