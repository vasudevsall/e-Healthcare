import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Login from './LoginComponent';
import LoggedIn from './loggedIn/LoggedInComponent';
import ManagerHome from './ManagerLogin/ManagerHomeComponent';
import BillComponent from './ManagerLogin/Ward/BillComponent';
import Register from "./RegisterComponent";
import DoctorHome from "./DoctorLogin/DoctorHomeComponent";
import About from './AboutComponent';
import Contact from "./ContactComponent";

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
                    <Route exact path = "/register" component = {() =>
                        <><Header/><Register/></>
                    }/>
                    <Route exact path = "/about" component = {() =>
                        <><Header/><About/></>
                    }/>
                    <Route exact path = "/contact" component = {() =>
                        <><Header/><Contact/></>
                    }/>
                    <Route path = "/welcome" component = {
                        () => <LoggedIn/>
                    }/>
                    <Route path = "/manager" component = {
                        () => <ManagerHome/>
                    }/>
                    <Route path="/doctor" component = {
                        () => <DoctorHome/>
                    }/>
                    <Route path={`/bill/:roomId`} component = {() =>
                        <BillComponent url={this.props.url}/>}
                    />
                    <Redirect to = "/home" />
                </Switch>
            </>
        );
    }
}

export default Main;