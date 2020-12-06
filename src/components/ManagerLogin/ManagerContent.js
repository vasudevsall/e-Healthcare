import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ManagerService from '../../services/ManagerService';
import InfoService from '../../services/InfoService';
import UserService from '../../services/UserService';
import AccomodationService from '../../services/AccomodationService';


function Loader(props) {
    return(
        <div className = 'full-flex-span'>
            <span className = 'fa fa-spin fa-circle-o-notch'></span>
        </div>
    );
}

class ManagerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersAvailable: false,
            doctors: [],
            doctorsAvailable: false,
            managers: [],
            managersAvailable: false,
            staff: [],
            staffAvailable: false,
            errMess: '',
            accomodation: [],
            accomodationAvailable: false
        }
    }

    componentDidMount() {
        this.toUnmount = false;
        ManagerService.getAllUsers()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    users: resp.data,
                    usersAvailable: true
                });
            }
        }).catch((err) => {
            UserService.verifyLogin()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'An error occured'
                    });
                }
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
        });

        InfoService.getAllDoctors()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    doctors: resp.data,
                    doctorsAvailable: true
                });
            }
        }).catch((err) => {
            UserService.verifyLogin()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'An error occured'
                    });
                }
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
        });

        ManagerService.getAllManagers()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    managers: resp.data,
                    managersAvailable: true
                });
            }
        }).catch((err) => {
            UserService.verifyLogin()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'An error occured'
                    });
                }
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
        });

        ManagerService.getAllStaff()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    staff: resp.data,
                    staffAvailable: true
                });
            }
        }).catch((err) => {
            UserService.verifyLogin()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'An error occured'
                    });
                }
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
        });

        AccomodationService.getAccomodationInformatin()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    accomodation: resp.data,
                    accomodationAvailable: true
                });
            }
        }).catch((err) => {
            UserService.verifyLogin()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'An error occured'
                    });
                }
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
        });
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    render() {
        return(
            <>
                <div className='fluid-container'>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <h4>Dashboard</h4>
                            <hr/>
                        </div>
                    </div>

                    <div className='row mb-2 mb-lg-5'>
                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Patients
                                </div>
                                <div className = 'body'>
                                    {(this.state.usersAvailable)? this.state.users.length : <Loader/>}
                                    <span className='fa fa-user hover-cyan float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Doctors
                                </div>
                                <div className = 'body'>
                                    {(this.state.doctorsAvailable)? this.state.doctors.length : <Loader/>}
                                    <span className='fa fa-user-md hover-green float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Managers
                                </div>
                                <div className = 'body'>
                                    {(this.state.managersAvailable)? this.state.managers.length : <Loader/>}
                                    <span className='fa fa-user-secret hover-blue float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Staff
                                </div>
                                <div className = 'body'>
                                    {(this.state.staffAvailable)? this.state.staff.length : <Loader/>}
                                    <span className='fa fa-user-plus hover-teal float-right'></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mb-2 mb-lg-5'>
                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Beds
                                </div>
                                <div className = 'body'>
                                    {(this.state.usersAvailable)? this.state.accomodation.beds : <Loader/>}
                                    <span className='fa fa-bed hover-orange float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Available Beds
                                </div>
                                <div className = 'body'>
                                    {(this.state.doctorsAvailable)? this.state.accomodation.totalBeds : <Loader/>}
                                    <span className='fa fa-bed hover-orange float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Rooms
                                </div>
                                <div className = 'body'>
                                    {(this.state.managersAvailable)? this.state.accomodation.totalRooms : <Loader/>}
                                    <span className='fa fa-stethoscope hover-purple float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Available Rooms
                                </div>
                                <div className = 'body'>
                                    {(this.state.staffAvailable)? this.state.accomodation.rooms : <Loader/>}
                                    <span className='fa fa-stethoscope hover-purple float-right'></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total ICUs
                                </div>
                                <div className = 'body'>
                                    {(this.state.usersAvailable)? this.state.accomodation.icu : <Loader/>}
                                    <span className='fa fa-heartbeat hover-red float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    ICUs Vacant
                                </div>
                                <div className = 'body'>
                                    {(this.state.doctorsAvailable)? this.state.accomodation.totalIcu : <Loader/>}
                                    <span className='fa fa-heartbeat hover-red float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Total Operation Theatres
                                </div>
                                <div className = 'body'>
                                    {(this.state.managersAvailable)? this.state.accomodation.ot : <Loader/>}
                                    <span className='fa fa-medkit hover-yellow float-right'></span>
                                </div>
                            </div>
                        </div>

                        <div className= 'col-lg-3 col-6 mb-2'>
                            <div className = 'dash-card manager-dash'>
                                <div className = 'head'>
                                    Operation Theatres Vacant
                                </div>
                                <div className = 'body'>
                                    {(this.state.staffAvailable)? this.state.accomodation.totalOt : <Loader/>}
                                    <span className='fa fa-medkit hover-yellow float-right'></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default withRouter(ManagerContent);