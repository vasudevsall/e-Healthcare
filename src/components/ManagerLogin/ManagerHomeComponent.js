import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect, withRouter, useRouteMatch} from 'react-router-dom';
import Header from './ManagerHeaderComponent';
import UserService from '../../services/UserService';
import ManagerSidebar from './ManagerSidebar';
import ErrorBoundary from "../ErrorBoundary";
import {Loader} from "../LoaderComponent";

const ManagerContent = lazy(() => import('./ManagerContent'));
const AllPatients = lazy(() => import('./Patient/AllPatients'));
const NewPatient = lazy(() => import('./Patient/NewPatient'));
const PatientDetails = lazy(() => import('./Patient/PatientDetails'));
const AllDoctors = lazy(() => import('./Doctor/AllDoctors'));
const DoctorDetails = lazy(() => import('./Doctor/DoctorDetails'));
const NewDoctor = lazy(() => import('./Doctor/NewDoctor'));
const AllStaff = lazy(() => import('./Staff/AllStaff'));
const NewStaff = lazy(() => import('./Staff/NewStaff'));
const StaffDetails = lazy(() => import('./Staff/StaffDetails'));
const PreviousAppointments = lazy(() => import('./Appointment/PreviousAppointments'));
const AppointmentSchedule = lazy(() => import('./Appointment/AppointmentSchedule'));
const NewAppointment = lazy(() => import('./Appointment/NewAppointment'));
const Current = lazy(() => import('./Ward/Current'));
const History = lazy(() => import('./Ward/History'));
const Admit = lazy(() => import('./Ward/Admit'));
const UpdateInfo = lazy(() => import('../loggedIn/User/UpdateInfo'));
const UpdatePassword = lazy(() => import('../loggedIn/User/UserPassword'));
const ManagerDetails = lazy(() => import('./User/ManagerDetails'));
const ItemsInStock = lazy(() => import("./Stock/ItemsInStock"));
const AllStock = lazy(() => import("./Stock/AllStock"));
const AddItem = lazy(() => import("./Stock/AddItem"));
const AddToStock = lazy(() => import("./Stock/AddToStock"));

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
            email: '',
            blood: '',
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
                        dateOfBirth: resp.data.dateOfBirth,
                        email: resp.data.email,
                        blood: resp.data.blood
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
                <Header url={this.props.url}/>
                <div className="wrapper">
                    <ManagerSidebar userInfo = {this.state} url = {this.props.url} />

                    <div id="content">
                        <ErrorBoundary>
                            <Suspense fallback={<Loader/>}>
                                <Switch>
                                    <Route exact path={`${this.props.path}`} component = {() =>
                                        <ManagerContent userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/details`} component = {() =>
                                        <ManagerDetails userInfo = {this.state} url = {this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/update`} component = {() =>
                                        <UpdateInfo url = {this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/password`} component = {() =>
                                        <UpdatePassword url = {this.props.url}/>}
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
                                        <Current url={this.props.url}/>}
                                    />
                                    <Route path={`${this.props.path}/room/history`} component = {() =>
                                        <History url={this.props.url}/>}
                                    />
                                    <Route path={`${this.props.path}/room/admit`} component = {() =>
                                        <Admit url={this.props.url}/>}
                                    />
                                    <Route path={`${this.props.path}/stock/current`} component = {() =>
                                        <ItemsInStock url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/stock`} component = {() =>
                                        <AllStock url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/stock/add`} component = {() =>
                                        <AddItem url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/stock/inventory`} component = {() =>
                                        <AddToStock url={this.props.url}/>}
                                    />
                                    <Redirect to={this.props.path} />
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
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