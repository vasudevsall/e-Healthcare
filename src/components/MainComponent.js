import React, { Component, Suspense, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Header from './HeaderComponent';
import ErrorBoundary from "./ErrorBoundary";
import {Loader} from './LoaderComponent';

const Home = lazy(() => import('./HomeComponent'));
const Login = lazy(() => import('./LoginComponent'));
const Register = lazy(() => import('./RegisterComponent'));
const About = lazy(() => import('./AboutComponent'));
const Contact = lazy(() => import('./ContactComponent'));
const Forgot = lazy(() => import('./ForgotComponent'));
const LoggedIn = lazy(() => import('./loggedIn/LoggedInComponent'));
const ManagerHome = lazy(() => import('./ManagerLogin/ManagerHomeComponent'));
const DoctorHome = lazy(() => import('./DoctorLogin/DoctorHomeComponent'));
const BillComponent = lazy(() => import('./ManagerLogin/Ward/BillComponent'));


class Main extends Component {

    render() {
        return(
            <>
                <ErrorBoundary>
                    <Suspense fallback={<Loader/>}>
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
                            <Route exact path = "/forgot" component = {() =>
                                <><Header/><Forgot/></>
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
                    </Suspense>
                </ErrorBoundary>
            </>
        );
    }
}

export default Main;