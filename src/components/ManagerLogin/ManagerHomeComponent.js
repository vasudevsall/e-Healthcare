import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter, useRouteMatch} from 'react-router-dom';
import Header from './ManagerHeaderComponent';
import UserService from '../../services/UserService';
import ManagerSidebar from './ManagerSidebar';
import ManagerContent from './ManagerContent';
import AllPatients from './Patient/AllPatients';
import NewPatient from './Patient/NewPatient';
import PatientDetails from './Patient/PatientDetails';
import AllDoctors from './Doctor/AllDoctors';
import DoctorDetails from './Doctor/DoctorDetails';
import NewDoctor from './Doctor/NewDoctor';
import AllStaff from './Staff/AllStaff';
import NewStaff from './Staff/NewStaff';
import StaffDetails from './Staff/StaffDetails';
import PreviousAppointments from './Appointment/PreviousAppointments';
import AppointmentSchedule from './Appointment/AppointmentSchedule';
import NewAppointment from './Appointment/NewAppointment';
import CurrentRoom from './Ward/CurrentRoom';
import RoomHistory from './Ward/RoomHistory';
import AdmitPatient from './Ward/AdmitPatient';

class ManagerDashboard extends Component {

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
                if(resp.data.roles !== "ROLE_MANAGE")
                    this.props.history.push("/login");
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
                    <ManagerSidebar userInfo = {this.state} url = {this.props.url} />

                    <div id="content">
                        <Switch>
                            <Route exact path={`${this.props.path}`} component = {() =>
                                <ManagerContent userInfo = {this.state} url={this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/patient/all`} component = {() =>
                                <AllPatients userInfo = {this.state} url={this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/patient/new`} component = {() =>
                                <NewPatient userInfo = {this.state} url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/patient/details/:userId`} component = {() =>
                                <PatientDetails url={this.props.url}/>}
                            />
                            <Route exact path={`${this.props.path}/doctor/all`} component = {() =>
                                <AllDoctors url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/doctor/details/:userId`} component = {() =>
                                <DoctorDetails url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/doctor/new`} component = {() =>
                                <NewDoctor url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/staff/all`} component = {() =>
                                <AllStaff url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/staff/new`} component = {() =>
                                <NewStaff url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/staff/details/:userId`} component = {() =>
                                <StaffDetails url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/appointment/previous`} component = {() =>
                                <PreviousAppointments url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/appointment/schedule`} component = {() =>
                                <AppointmentSchedule url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/appointment/new`} component = {() =>
                                <NewAppointment url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/room/current`} component = {() =>
                                <CurrentRoom url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/room/history`} component = {() =>
                                <RoomHistory url={this.props.url}/>}
                            />
                            <Route path={`${this.props.path}/room/admit`} component = {() =>
                                <AdmitPatient url={this.props.url}/>}
                            />
                            <Redirect to={this.props.path} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

function ManagerHome(props) {
    let {path, url} = useRouteMatch();
    return(
        <ManagerDashboard path={path} url={url} history={props.history} />
    );
}

export default withRouter(ManagerHome);