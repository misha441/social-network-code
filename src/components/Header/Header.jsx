import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import mainLogo from '../../assets/photos/logo.png';
import cn from 'classnames';
import {faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={'container'}>
                <div className={s.header__inner}>
                    <img className={s.header_logo} src={mainLogo} alt=''/>
                    <div className={s.loginBlock}>
                        {props.isAuth
                            ? <div><span className={s.loginBlock__name}>{props.login}</span>
                                <button className={cn('buttonStyle', s.headerButton)} onClick={props.logout}>
                                    <FontAwesomeIcon className={s.headerIcon} icon={faSignOutAlt} fixedWidth />
                                    Log out
                                </button></div>
                            : <NavLink className={s.loginBlock__Login} to={'/login'}>Login</NavLink>}
                    </div>
                </div>
            </div>


        </header>
    );
}

export default Header;