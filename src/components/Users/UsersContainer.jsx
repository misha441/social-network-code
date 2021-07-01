import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, requestUsers, setTermValue,
    setUsers, toggleFollowingProgress, unfollow
} from "../../redux/usersReducer";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
//import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize, getTermValue,
    getTotalUsersCount,
    getUsers,
    getUsersInFollowingProgress
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        if (this.props.users.length === 0) {
            const {currentPage, pageSize} = this.props;
            this.props.requestUsers(currentPage, pageSize)
        }
    }


    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize, this.props.term)
    }

    render() {
        return <>
            <Users currentPage={this.props.currentPage}
                   totalUsersCount={this.props.totalUsersCount}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   UsersInFollowingProgress={this.props.UsersInFollowingProgress}
                   requestUsers={this.props.requestUsers}
                   isFetching={this.props.isFetching}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        UsersInFollowingProgress: getUsersInFollowingProgress(state),
        term: getTermValue(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, setUsers,toggleFollowingProgress,
        requestUsers, setTermValue})
)(UsersContainer);