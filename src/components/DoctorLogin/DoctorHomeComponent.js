import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect, useRouteMatch, withRouter} from "react-router-dom";
import {Loader} from "../LoaderComponent";
import ErrorBoundary from "../ErrorBoundary";
import Header from '../loggedIn/LoginHeaderComponent';
import UserService from "../../services/UserService";
import DoctorSidebar from "./DoctorSidebarComponent";

const DoctorContent = lazy(() => import("./DoctorContent"));
const DoctorDetails = lazy(() => import("./User/Details"));
const UpdateInfo = lazy(() => import("../loggedIn/User/UpdateInfo"));
const UpdatePassword = lazy(() => import("../loggedIn/User/UserPassword"));
const AppointmentHistory = lazy(() => import("./Appointments/AppointmentHistory"));
const UpcomingAppointments = lazy(() => import("./Appointments/UpcomingAppointments"));
const MySchedule = lazy(() => import("./Schedule/MySchedule"));
const UpdateSchedule = lazy(() => import("./Schedule/UpdateSchedule"));
const PatientDetails = lazy(() => import("./Patient/PatientDetails"));
const PreviousOnline = lazy(() => import("../loggedIn/Online Consultation/PreviousOnline"));
const Chat = lazy(() => import("../loggedIn/Online Consultation/OnlineChat"));

class DoctorDashboard extends Component {

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
                if(resp.data.roles !== "ROLE_DOC")
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
                <Header url={this.props.url}/>
                <div className='wrapper'>
                    <DoctorSidebar userInfo={this.state} url={this.props.url} />

                    <div id="content">
                        <ErrorBoundary>
                            <Suspense fallback={<Loader/>}>
                                <Switch>
                                    <Route exact path={`${this.props.path}`} component={() =>
                                        <DoctorContent userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/details`} component={() =>
                                        <DoctorDetails userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/update`} component={() =>
                                        <UpdateInfo userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/password`} component={() =>
                                        <UpdatePassword userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/appointment/history`} component={() =>
                                        <AppointmentHistory userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/appointment/upcoming`} component={() =>
                                        <UpcomingAppointments userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/schedule`} component={() =>
                                        <MySchedule userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/schedule/update`} component={() =>
                                        <UpdateSchedule userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/patient/details`} component={() =>
                                        <PatientDetails userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/consult/history`} component = {() =>
                                        <PreviousOnline url = {this.props.url}  past={true} doctor={true}/>}
                                    />
                                    <Route exact path={`${this.props.path}/consult/current`} component = {() =>
                                        <PreviousOnline url = {this.props.url} past={false} doctor={true}/>}
                                    />
                                    <Route path={`${this.props.path}/consult/chat/:consultId`} component={() =>
                                        <Chat url={this.props.url}/>}
                                    />
                                    <Redirect to={`${this.props.path}`}/>
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </div>
            </>
        );
    }
}

function DoctorHome(props) {
    let {path, url} = useRouteMatch();
    return(
        <DoctorDashboard url={url} path={path} history={props.history} />
    );
}

export default withRouter(DoctorHome);