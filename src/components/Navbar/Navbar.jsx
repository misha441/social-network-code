import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faMusic, faNewspaper, faSlidersH, faUser, faUserFriends} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (<div className={s.navbar}>
            <nav className={s.navbarNav}>
                <li className={s.navContent}>
                    <NavLink to='/profile' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faUser} fixedWidth />
                        Profile
                    </NavLink>
                </li>
                <li className={`${s.navContent} ${s.active}`}>
                    <NavLink to='/dialogs' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faEnvelope} fixedWidth />
                        Messages
                    </NavLink>
                </li>
                <li className={`${s.navContent} ${s.active}`}>
                    <NavLink to='/users' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faUserFriends} fixedWidth />
                        Users
                    </NavLink>
                </li>
                <li className={s.navContent}>
                    <NavLink to='/news' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faNewspaper} fixedWidth />
                        News
                    </NavLink>
                </li>
                <li className={s.navContent}>
                    <NavLink to='/music' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faMusic}  fixedWidth />
                        Music
                    </NavLink>
                </li>
                <li className={s.navContent}>
                    <NavLink to='/settings' activeClassName={s.active}>
                        <FontAwesomeIcon className={s.navbarIcon} icon={faSlidersH} fixedWidth />
                        Settings
                    </NavLink>
                </li>
            </nav>
        </div>
    );
}

export default Navbar;