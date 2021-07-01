import './App.css';
import React, {useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import withSuspence from "./hoc/withSuspense";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const App = (props) => {
    useEffect(() => {
        props.initializeApp()
    }, [])

    if (!props.initialized) {
        return <Preloader/>
    }

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <div className={'container'}>
                <div className={'mainContent'}>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/dialogs/:userId?' render={withSuspence(DialogsContainer)}/>
                            <Route path='/profile/:userId?' render={withSuspence(ProfileContainer)}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                        </Switch>
                    </div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppWrapper = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;