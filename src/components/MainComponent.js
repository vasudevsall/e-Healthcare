import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';
import LoggedIn from './loggedIn/LoggedInComponent';
import ManagerHome from './ManagerLogin/ManagerHomeComponent';

class Main extends Component {

    render() {
        return(
            <>
                <Switch>
                    <Route exact path = "/home" component = {() => 
                        <><Header/><Home/></>
                    } />
                    <Route exact path = "/login" component = {() => 
                        <><Header/><Login/></>
                    }/>
                    <Route path = "/welcome" component = {
                        () => <LoggedIn/>
                    }/>
                    <Route path = "/manager" component = {
                        () => <ManagerHome/>
                    }/>
                    <Redirect to = "/home" />
                </Switch>
            </>
        );
    }
}

export default Main;