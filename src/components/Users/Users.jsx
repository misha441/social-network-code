import React from 'react';
import styles from './users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearcher from "./UserSearcher";
import Preloader from "../common/Preloader/Preloader";

const Users = (props) => {

    const onSubmit = (formData) => {
        props.requestUsers(1, props.pageSize, formData.term)
    }
    console.log(props.users)
    return <div className={styles.usersWrapper}>
        <div>
            <UserSearcher onSubmit={onSubmit}/>
        </div>
        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       totalUsersCount={props.totalUsersCount}
                       pageUsersSize={props.pageSize}
                       pageSize={15}/>
        </div>
        <div className={styles.userBlocksWrapper}>
            {props.isFetching ? <Preloader/> : null}
            {props.users.length > 0
                ? <div className={styles.userBlocks}>
                    {props.users.map(u => <User key={u.id}
                                                UsersInFollowingProgress={props.UsersInFollowingProgress}
                                                follow={props.follow}
                                                unfollow={props.unfollow} user={u}
                                                isFetching={props.isFetching}/>)}
                </div>
                : <div className={styles.nothingFoundText}>nothing found</div>
            }
        </div>
    </div>
}

export default Users;