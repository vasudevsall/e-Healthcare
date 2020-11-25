import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './LoginHeaderComponent';
import UserService from '../../services/UserService';

class LoggedIn extends Component {

    constructor(props) {
        super(props);
        this.checkLoggedin();
    }

    checkLoggedin() {
        UserService.verifyLogin()
        .catch((err) => {
            this.props.history.push("/login");
        })
    }

    render() {
        return(
            <>
                <Header/>
                <Switch>
                    <Route path="/" component = {() => <></>}/>
                    <Redirect to="/"/>
                </Switch>  
            </>
        );
    }
}

export default withRouter(LoggedIn);