import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter, useRouteMatch} from 'react-router-dom';
import Header from './LoginHeaderComponent';
import UserService from '../../services/UserService';
import SideBar from './LoginSideBarComponent';
import DashboardContent from './LoggedInContentComponent';
import AllAppoinemtns from './Appointments/AllAppointments';
import ScheduleAppointments from './Appointments/ScheduleAppointment';
import PreviousAppointments from './Appointments/PreviousAppointments';
import ScheduledAppointment from './Appointments/ScheduledAppointments';
import UserPrescriptions from './Pharmacy/UserPrescriptions';
import SearchMedicine from './Pharmacy/SearchMedicine';
import OrderMedicine from './Pharmacy/OrderMedicine';
import MedOrders from './Pharmacy/MedOrders';

class LoggedInComponent extends Component {

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
        this.toUnmount = false;
        UserService.getUserDetails()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        username: resp.data.username,
                        name: resp.data.name,
                        phoneNumber: resp.data.phoneNumber,
                        gender: resp.data.gender,
                        dateOfBirth: resp.data.dateOfBirth
                    });
                }
            }).catch((err) => {
               UserService.logoutUser()
                .then((resp) => {
                    this.props.history.push("/login");
                }).catch((error)=> {
                    this.props.history.push("/login");
                });
            });
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    render() {
        return(
            <>
                <Header/>
                <div className="wrapper">
                    <SideBar userInfo = {this.state} url = {this.props.url}/>

                    <div id="content">
                        <Switch>
                            <Route exact path={`${this.props.path}`} component = {() =>
                                <DashboardContent userInfo = {this.state} url={this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/appointments/all`} component = {() => 
                                <AllAppoinemtns url = {this.props.url}/>} 
                            />
                            <Route exact path={`${this.props.path}/appointments/schedule`} component = {() =>
                                <ScheduleAppointments url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/appointments/history`} component = {() =>
                                <PreviousAppointments url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/appointments/scheduled`} component = {() =>
                                <ScheduledAppointment url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/pharmacy/prescriptions`} component = {() =>
                                <UserPrescriptions url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/pharmacy/search`} component = {() =>
                                <SearchMedicine url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/pharmacy/order`} component = {() =>
                                <OrderMedicine url = {this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/pharmacy/orders`} component = {() =>
                                <MedOrders url = {this.props.url}/>}
                            />
                            <Redirect to={this.props.path}/>
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

function LoggedIn(props) {
    let {path, url} = useRouteMatch();
    return(
        <LoggedInComponent path={path} url={url} history={props.history} />
    );
}

export default withRouter(LoggedIn);