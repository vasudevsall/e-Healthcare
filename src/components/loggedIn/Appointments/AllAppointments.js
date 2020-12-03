import React, {Component} from 'react';
import AppointmentService from '../../../services/AppointmentService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class AllAppointments extends Component {

    constructor(props) {
        super(props)
        this.state ={
            appointments: [],
            appointmentsAvailable: false,
            errMess: ''
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.toCheckDetails = this.toCheckDetails.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AppointmentService.getAppointments()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        appointments: resp.data,
                        appointmentsAvailable: true
                    });
                }
            })
            .catch((err) => {
                UserService.verifyLogin()
                    .then((resp) => {
                        if(!this.toUnmount) {
                            this.setState({
                                errMess: 'An error occured'
                            });
                        }
                    }).catch((err) => {
                        this.props.history.push('/login');
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

    toCheckDetails(date, serial) {
        let dt = this.formatDate(date).split("-");
        let time = this.formatDate(date, false).split(":");
        let schedule = new Date(dt[2], dt[1]-1, dt[0], time[2], time[1]);
        let current = new Date();
        if(schedule < current){
            return (<Link to={`${this.props.url}/appointment/${serial}`}>Get Details</Link>);
        } else {
            return ('');
        }
    }

    formTable() {
        if(!this.state.appointmentsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.appointments.length > 0) {
                let counter = 1;
                const tableBody = this.state.appointments.map((appointment) => {
                    return(
                        <tr key={appointment.serial}>
                            <td>{counter++}</td>
                            <td>{`Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                            <td>{this.formatDate(appointment.date)}</td>
                            <td>{this.formatDate(appointment.date, false)}</td>
                            <td>{this.toCheckDetails(appointment.date, appointment.serial)}</td>
                        </tr>
                    );
                });
                return(
                    <Table hover bordered striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                );
            }
        }
    }

    render() {
        const table = this.formTable();

        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>All Appointments</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-lg-8 table-div'>
                        {table}
                    </div>
                </div>
                <div className='row'>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/appointments/schedule`}>
                            Schedule New
                        </Link>
                    </div>
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/appointments/scheduled`}>
                            Cancel Scheduled
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AllAppointments);