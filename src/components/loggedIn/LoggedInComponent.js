import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './LoginHeaderComponent';
import UserService from '../../services/UserService';
import SideBar from './LoginSideBarComponent';
import DashboardContent from './LoggedInContentComponent';

class LoggedIn extends Component {

    constructor(props) {
        super(props);
        this.checkLoggedin();
        this.state = {
            username: '',
            name: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: '',
            isReady: false
        }
    }

    checkLoggedin() {
        UserService.verifyLogin()
        .catch((err) => {
            this.props.history.push("/login");
        })
    }

    componentDidMount() {
        UserService.getUserDetails()
            .then((resp) => {
                this.setState({
                    username: resp.data.username,
                    name: resp.data.name,
                    phoneNumber: resp.data.phoneNumber,
                    gender: resp.data.gender,
                    dateOfBirth: resp.data.dateOfBirth
                });
            }).catch((err) => {
               UserService.logoutUser()
                .then((resp) => {
                    this.props.history.push("/login");
                }).catch((error)=> {
                    this.props.history.push("/login");
                });
            });
    }

    render() {
        return(
            <>
                <Header/>
                <div className="wrapper">
                    <SideBar></SideBar>

                    <div id="content">
                        <Switch>
                            <Route path="/" component = {() =>
                                <DashboardContent userInfo = {this.state}/>}
                            />
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(LoggedIn);