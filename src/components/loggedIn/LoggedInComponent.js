import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect, withRouter, useRouteMatch} from 'react-router-dom';
import {Loader} from "../LoaderComponent";
import ErrorBoundary from "../ErrorBoundary";
import Header from './LoginHeaderComponent';
import UserService from '../../services/UserService';
import SideBar from './LoginSideBarComponent';

const DashboardContent = lazy(() => import('./LoggedInContentComponent'));
const AllAppoinemtns = lazy(() => import('./Appointments/AllAppointments'));
const ScheduleAppointments = lazy(() => import('./Appointments/ScheduleAppointment'));
const PreviousAppointments = lazy(() => import('./Appointments/PreviousAppointments'));
const ScheduledAppointment = lazy(() => import('./Appointments/ScheduledAppointments'));
const UserPrescriptions = lazy(() => import('./Pharmacy/UserPrescriptions'));
const SearchMedicine = lazy(() => import('./Pharmacy/SearchMedicine'));
const OrderMedicine = lazy(() => import('./Pharmacy/OrderMedicine'));
const MedOrders = lazy(() => import('./Pharmacy/MedOrders'));
const UserDetails = lazy(() => import('./User/Details'));
const UpdateInfo = lazy(() => import('./User/UpdateInfo'));
const UpdatePassword = lazy(() => import('./User/UserPassword'));
const PreviousOnline = lazy(() => import("./Online Consultation/PreviousOnline"));
const NewConsultation = lazy(() => import("./Online Consultation/NewConsult"));
const Chat = lazy(() => import("./Online Consultation/OnlineChat"));

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
                <Header url = {this.props.url}/>
                <div className="wrapper">
                    <SideBar userInfo = {this.state} url = {this.props.url}/>

                    <div id="content">
                        <ErrorBoundary>
                            <Suspense fallback={<Loader/>}>
                                <Switch>
                                    <Route exact path={`${this.props.path}`} component ={() =>
                                        <DashboardContent userInfo = {this.state} url={this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/details`} component = {() =>
                                        <UserDetails url = {this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/update`} component = {() =>
                                        <UpdateInfo url = {this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/user/password`} component = {() =>
                                        <UpdatePassword url = {this.props.url}/>}
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
                                    <Route exact path={`${this.props.path}/consult/history`} component = {() =>
                                        <PreviousOnline url = {this.props.url}  past={true} doctor={false}/>}
                                    />
                                    <Route exact path={`${this.props.path}/consult/new`} component = {() =>
                                        <NewConsultation url = {this.props.url}/>}
                                    />
                                    <Route exact path={`${this.props.path}/consult/current`} component = {() =>
                                        <PreviousOnline url = {this.props.url} past={false} doctor={false}/>}
                                    />
                                    <Route path={`${this.props.path}/consult/chat/:consultId`} component={() =>
                                        <Chat url={this.props.url}/>}
                                    />
                                    <Redirect to={this.props.path}/>
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
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