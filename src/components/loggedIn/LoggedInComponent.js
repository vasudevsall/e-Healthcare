import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './LoginHeaderComponent';
import UserService from '../../services/UserService';
import SideBar from './LoginSideBarComponent';
import Content from './LoggedInContentComponent';

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
                <div className="wrapper">
                    <SideBar></SideBar>

                    <div id="content">
                        <Switch>
                            <Route path="/" component = {() => <Content/>}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(LoggedIn);