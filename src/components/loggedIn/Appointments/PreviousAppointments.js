import React, {Component} from 'react';
import AppointmentService from '../../../services/AppointmentService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class PreviousAppointment extends Component {

    constructor(props) {
        super(props)
        this.state ={
            appointments: [],
            appointmentsAvailable: false,
            errMess: '',
            isModalOpen: false,
            appointmentDetails: [],
            isDetailsAvailable: false
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.toCheckDetails = this.toCheckDetails.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AppointmentService.getPreviousAppointments()
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
            return (<Button onClick={(event) => {this.openModal(serial)}}>Get Details</Button>);
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
                    <Table hover bordered striped responsive size="sm">
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

    formModalBody() {
        if(!this.state.isDetailsAvailable) {
            return(<div className='full-flex-span'>
                <span className='fa fa-spin fa-circle-o-notch'></span>
            </div>);
        } else {
            return(<div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <label>Patient Name: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.appointmentDetails.appointmentsModel.user.firstName + " " + 
                                this.state.appointmentDetails.appointmentsModel.user.lastName}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Doctor Name: </label>
                    </div>
                    <div className='col-6'>
                        {"Dr. " + this.state.appointmentDetails.appointmentsModel.doctor.firstName + " " + 
                                this.state.appointmentDetails.appointmentsModel.doctor.lastName}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Date: </label>
                    </div>
                    <div className='col-6'>
                        {this.formatDate(this.state.appointmentDetails.appointmentsModel.date)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Time: </label>
                    </div>
                    <div className='col-6'>
                        {this.formatDate(this.state.appointmentDetails.appointmentsModel.date, false)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Prescriptions: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.appointmentDetails.prescription}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Suggested Tests: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.appointmentDetails.tests}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Comments: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.appointmentDetails.comments}
                    </div>
                </div>
            </div>);
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    openModal(serial) {
        AppointmentService.getAppointmentDetails(serial)
        .then((resp) => {
            this.setState({
                appointmentDetails: resp.data,
                isDetailsAvailable: true,
                isModalOpen: !this.state.isModalOpen
            })
        }).catch((err) => {
            this.setState({
                errMess: 'An error occured'
            })
        });
    }

    render() {
        const table = this.formTable();
        const formModal = this.formModalBody();

        return(
            <div className='fluid-container'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Appointment Details</ModalHeader>
                    <ModalBody>
                        {formModal}
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Appointment History</h4>
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
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/appointments/all`}>
                            View All
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(PreviousAppointment);