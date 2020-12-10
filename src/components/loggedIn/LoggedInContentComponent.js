import React, {Component} from 'react';
import AppointmentService from '../../services/AppointmentService';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import UserService from '../../services/UserService';
import {Link, withRouter} from 'react-router-dom';
import {Table} from 'reactstrap';
import classnames from 'classnames';

class DashboardContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcomingAppointments: [],
            ifUpcomingData: false,
            activeTab: '1'
        }
        this.renderScheduleFunction = this.renderScheduleFunction.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AppointmentService.getUpcomingAppointments()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    upcomingAppointments: resp.data,
                    ifUpcomingData: true
                })
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

    formatDate(date, noTime = true) {
        let dt = date.split("T");
        let ymd = dt[0].split("-");
        let time = dt[1].split("+");
        let t = time[0].split(".");
        if(noTime)
            return (ymd[2] + "-" + ymd[1] + "-" + ymd[0]);
        return t[0];
    }

    renderScheduleFunction() {
        if(!this.state.ifUpcomingData) {
            return (<div className = 'full-flex-span'>
                <span className = 'fa fa-spin fa-circle-o-notch'></span>
            </div>);
        }
        else {
            let count = 1;
            const tableData = this.state.upcomingAppointments.map((appointment) => {
                return(
                    <tr key = {appointment.serial}>
                        <td>{count++}</td>
                        <td>{
                            "Dr. " + appointment.doctor.firstName + "  " 
                            + appointment.doctor.lastName
                        }</td>
                        <td>{this.formatDate(appointment.date)}</td>
                        <td>{this.formatDate(appointment.date, false)}</td>
                    </tr>
                );
            });
            if(this.state.upcomingAppointments.length > 0) {
                return(
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                );
            } else {
                return (
                    <div className = 'full-flex-span'>
                        <span>No scheduled appointments</span>
                    </div>
                )
            }
        }
    }

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const renderSchedule =  this.renderScheduleFunction(); 
                    

        return(
            <>
                <div className='fluid-container'>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <h4>Dashboard</h4>
                            <hr/>
                        </div>
                    </div>

                    <div className='row mb-5'>
                        <div className= 'col-lg-8 col-12'>
                            <div className = 'dash-card'>
                                <div className = 'head'>
                                    Quick Links
                                </div>
                                <div className = 'body'>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => this.toggle('1')}
                                            >
                                                Appointments
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => this.toggle('2')}
                                            >
                                                Pharmacy
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '4' })}
                                                onClick={() => this.toggle('4')}
                                            >
                                                My Account
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <div className='fluid-container'>
                                                <div className= 'row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/appointments/all`}>
                                                            <span className='fa fa-list-alt fa-lg'></span> See All Appointments
                                                        </Link>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/appointments/history`}>
                                                            <span className='fa fa-history fa-lg'></span> Previous Appointments
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/appointments/scheduled`}>
                                                            <span className='fa fa-calendar fa-lg'></span> Scheduled Appointments
                                                        </Link>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/online`}>
                                                            <span className='fa fa-wifi fa-lg'></span> Online Consultation
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/appointments/schedule`}>
                                                            <span className='fa fa-plus-square-o fa-lg'></span> Schedule New
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className='fluid-container'>
                                                <div className= 'row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/pharmacy/prescriptions`}>
                                                            <span className='fa fa-user-md fa-lg'></span> Your Prescriptions
                                                        </Link>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/pharmacy/order`}>
                                                            <span className='fa fa-medkit fa-lg'></span> Order Medicine
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/pharmacy/orders`}>
                                                            <span className='fa fa-truck fa-lg'></span> Your Orders
                                                        </Link>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/pharmacy/search`}>
                                                            <span className='fa fa-search fa-lg'></span> Search Medicine
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="4">
                                            <div className='fluid-container'>
                                                <div className= 'row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/user/details`}>
                                                            <span className='fa fa-lg fa-user-circle'></span> Personal Details
                                                        </Link>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/user/update`}>
                                                            <span className='fa fa-lg fa-pencil-square-o'></span> Update Information
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <div className='col-6'>
                                                        <Link to={`${this.props.url}/user/password`}>
                                                            <span className='fa fa-lg fa-key'></span> Change Password
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className= 'col-lg-8 col-12'>
                            <div className = 'dash-card'>
                                <div className = 'head'>
                                    Upcoming Appointments
                                </div>
                                <div className = 'body'>
                                    {renderSchedule}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default withRouter(DashboardContent);