import React, {Component} from 'react';
import AppointmentService from '../../../services/AppointmentService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table, Form, FormGroup, Input, Label, Col, Button, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';

class PreviousAppointments extends Component {

    constructor(props) {
        super(props)
        this.state ={
            appointments: [],
            AllAppointments: [],
            appointmentsAvailable: false,
            errMess: '',
            name: '',
            doctor: '',
            isModalOpen: false,
            details: [],
            isDetailsAvailable: false
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AppointmentService.getAllPreviousAppointments()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        appointments: resp.data,
                        AllAppointments: resp.data,
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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let appointment;
        let filterAppointments = [];
        for(appointment of this.state.AllAppointments) {
            let docName = appointment.doctor.firstName + ' ' +  appointment.doctor.lastName;
            let name = appointment.user.firstName + ' ' + appointment.user.lastName;
            name = name.toLowerCase();
            docName = docName.toLowerCase();
            let search = this.state.name.toLowerCase();
            let docSearch = this.state.doctor.toLowerCase();
            if(name.includes(search) && docName.includes(docSearch)) {
                filterAppointments.push(appointment);
            }
        }

        this.setState({
            appointments: filterAppointments
        })
    }

    formTable() {
        if(!this.state.appointmentsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            let counter = 1;
            const tableBody = this.state.appointments.map((appointment) => {
                return(
                    <tr key={appointment.serial}>
                        <td>{counter++}</td>
                        <td>{`Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                        <td>{`${appointment.user.firstName} ${appointment.user.lastName}`}</td>
                        <td>{this.formatDate(appointment.date)}</td>
                        <td>{this.formatDate(appointment.date, false)}</td>
                        <td>
                            <button className='btn btn-dark bg-info' onClick={() => this.openModal(appointment.serial)}>
                                <span className='fa fa-info-circle fa-lg'></span>
                            </button>
                        </td>
                    </tr>
                );
            });
            return(
                <>
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Doctor</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>

                </>
            );
        }
    }

    formModal() {
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
        const modal = this.formModal();

        return(
            <div className='fluid-container'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Appointment Details</ModalHeader>
                    <ModalBody>
                        {modal}
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Appointments History</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 table-div'>
                        {table}
                    </div>
                </div>
                <Row className='mb-5'>
                    <Col sm={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='form-name' sm={1}>Patient:</Label>
                                <Col sm={3}>
                                    <Input name='name' type='text'
                                        id='form-name' placeholder='Name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                    />
                                </Col>
                                <Label htmlFor="form-doctor" className='offset-sm-1' sm={1}>Doctor:</Label>
                                <Col sm={3}>
                                    <Input name='doctor' type='text'
                                        id='form-doctor' placeholder='Doctor'
                                        value={this.state.doctor}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Button type='submit' className='btn-dark'>
                                        <span className='fa fa-search'></span>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <div className='row'>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/appointment/new`}>
                            New Appointment
                        </Link>
                    </div>
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/appointment/schedule`}>
                            Scheduled Appointments
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(PreviousAppointments);