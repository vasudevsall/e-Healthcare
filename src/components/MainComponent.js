import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';
import LoggedIn from './loggedIn/LoggedInComponent';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            username: '',
            name: '',
            phone: ''
        };
        this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    toggleLoggedIn(newVal) {
        this.setState({
            loggedin: newVal
        });
    }

    setUserInfo(username, name, phone) {
        this.setState({
            username: username,
            name: name,
            phone: phone 
        });
    }

    render() {
        return(
            <>
                <Switch>
                    <Route path = "/home" component = {() => 
                        <><Header/><Home/></>
                    } />
                    <Route path = "/login" component = {() => 
                        <><Header/><Login toggleLogin = {this.toggleLoggedIn} setUserInfo = {this.setUserInfo}/></>
                    }/>
                    <Route path = "/welcome" component = {
                        () => <LoggedIn/>
                    }/>
                    <Redirect to = "/home" />
                </Switch>
            </>
        );
    }
}

export default Main;