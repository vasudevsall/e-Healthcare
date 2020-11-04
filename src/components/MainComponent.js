import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';

class Main extends Component {

    render() {
        return(
            <>
                <Header/>
                <Switch>
                    <Route path = "/home" component = {() => <Home/>} />
                    <Route path = "/login" component = {() => <Login />} />
                    <Redirect to = "/home" />
                </Switch>
            </>
        );
    }
}

export default Main;