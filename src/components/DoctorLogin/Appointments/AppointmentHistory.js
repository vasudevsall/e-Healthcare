import React, {Component} from 'react';
import AppointmentService from '../../../services/AppointmentService';
import DocService from "../../../services/DocService";
import {withRouter} from 'react-router-dom';
import {Table, Modal, ModalHeader, ModalBody, Button, Col,
    Form, FormGroup, Label, Input, Row, Alert} from 'reactstrap';
class AppointmentHistory extends Component {

    constructor(props) {
        super(props)
        this.state ={
            appointments: [],
            allAppointments:[],
            appointmentsAvailable: false,
            errMess: '',
            isModalOpen: false,
            appointmentDetails: [],
            isDetailsAvailable: false,
            name: '',
            details: false,
            date: '',
            isUpdateModalOpen: false,
            selectedUpdateId: [],
            prescription: '',
            test: '',
            comments: '',
            once: false,
            isAlertOpen: false,
            modalError: ''
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateFocus = this.dateFocus.bind(this);
        this.dateBlur = this.dateBlur.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.formUpdateModalBody = this.formUpdateModalBody.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        DocService.getPreviousAppointments()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        appointments: resp.data,
                        allAppointments: resp.data,
                        appointmentsAvailable: true
                    });
                }
            })
            .catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'There was an error in fetching Appointment Details'
                    });
                }
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleClear() {
        this.setState({
            name: '',
            date: '',
            details: false,
            appointments: this.state.allAppointments
        });
    }

    toggleAlert() {
        this.setState({
            isAlertOpen: !this.state.isAlertOpen
        })
    }

    handleSubmit(event) {
        event.preventDefault();


        let appointment;
        let filterAppointments = [];
        let date;
        let dateStr;
        if(this.state.date !== '') {
            date = this.state.date.split("-");
            dateStr = date[2] + "-" + date[1] + "-" + date[0];
        } else {
            dateStr = '';
        }
        for(appointment of this.state.allAppointments) {
            let name = appointment.user.firstName + ' ' + appointment.user.lastName;
            name = name.toLowerCase();
            let search = this.state.name.toLowerCase();
            let apptDate = this.formatDate(appointment.date)
            if(name.includes(search) && apptDate.includes(dateStr) && (this.state.details === !appointment.details)) {
                filterAppointments.push(appointment);
            }
        }

        this.setState({
            appointments: filterAppointments
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

    openUpdateModal(serial) {
        this.setState({
            isUpdateModalOpen: true,
            selectedUpdateId: serial,
            once: false
        })
    }

    formTable() {
        if(!this.state.appointmentsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            if(this.state.appointments.length > 0) {
                let counter = 1;
                const tableBody = this.state.appointments.map((appointment) => {
                    return(
                        <tr key={appointment.serial}>
                            <td>{counter++}</td>
                            <td>{`${appointment.user.firstName} ${appointment.user.lastName}`}</td>
                            <td>{this.formatDate(appointment.date)}</td>
                            <td>{this.formatDate(appointment.date, false)}</td>
                            <td>
                                <Button size={'sm'} disabled={!appointment.details} color='info'
                                        onClick={(event) => {this.openModal(appointment.serial)}}
                                >
                                    <span className='fa fa-info-circle fa-lg'/>
                                </Button>
                                <Button size={'sm'} onClick={(event) => this.openUpdateModal(appointment)}
                                        className={'mx-2'}
                                >
                                    <span className='fa fa-pencil-square fa-lg'/>
                                </Button>
                            </td>
                        </tr>
                    );
                });
                return(
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Patient</th>
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

    dateFocus(event) {
        event.currentTarget.type = 'date';
    }
    dateBlur(event) {
        event.currentTarget.type = 'text';
        let name = event.target.name;
        event.currentTarget.placeholder = name.charAt(0).toUpperCase() + name.slice(1);
    }

    formModalBody() {
        if(!this.state.isDetailsAvailable) {
            return(<div className='full-flex-span'>
                <span className='fa fa-spin fa-circle-o-notch'/>
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

    toggleUpdateModal() {
        this.setState({
            isUpdateModalOpen: !this.state.isUpdateModalOpen,
            selectedUpdateId: [],
            prescription: '',
            test: '',
            comments: ''
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

    handleModalSubmit(event) {
        event.preventDefault();
        DocService.postAppointments(this.state.selectedUpdateId.serial, this.state.prescription,
            this.state.test, this.state.comments
        ).then((resp) => {
            this.setState({
                isAlertOpen: true
            })
            this.toggleUpdateModal();
        }).catch((err) => {
            this.setState({
               modelError: 'Could not update details due to an error!'
            });
        });
    }

    formUpdateModalBody() {
        if(this.state.selectedUpdateId.length === 0) {
            return(
                <div className='full-flex-span'>
                    <label>No Appointment Selected</label>
                </div>
            );
        }
        if(!this.state.once) {
            AppointmentService.getAppointmentDetails(this.state.selectedUpdateId.serial)
                .then((resp) => {
                    this.setState({
                        prescription: resp.data.prescription,
                        test: resp.data.tests,
                        comments: resp.data.comments,
                        once: true
                    })
                }).catch((err) => {
                this.setState({
                    prescription: '',
                    test: '',
                    comments: '',
                    once: true
                })
            });
        }
        return(
            <Form onSubmit={this.handleModalSubmit}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        {this.state.modalError}
                    </div>
                </div>
                <FormGroup row>
                    <Label sm={3} htmlFor='modal-form-name'>Name</Label>
                    <Col sm={7}>
                        <Input name='form-name'
                               type={'text'}
                               id='modal-form-name'
                               disabled required
                               value={`${this.state.selectedUpdateId.user.firstName} ${this.state.selectedUpdateId.user.lastName}`}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} htmlFor='form-doctor'>Doctor</Label>
                    <Col sm={7}>
                        <Input name='form-doctor'
                               type={'text'}
                               id='form-doctor'
                               disabled required
                               value={`Dr. ${this.state.selectedUpdateId.doctor.firstName} ${this.state.selectedUpdateId.doctor.lastName}`}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} className={'d-flex align-items-center'} htmlFor='form-prescriptions'>Prescriptions</Label>
                    <Col sm={7}>
                        <Input name='prescription'
                               type={'textarea'}
                               id='form-prescriptions'
                               value={this.state.prescription}
                               onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} className={'d-flex align-items-center'} htmlFor='form-test'>Tests</Label>
                    <Col sm={7}>
                        <Input name='test'
                               type={'textarea'}
                               id='form-test'
                               value={this.state.test}
                               onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} className={'d-flex align-items-center'} htmlFor='form-comment'>Comments</Label>
                    <Col sm={7}>
                        <Input name='comments'
                               type={'textarea'}
                               id='form-comment'
                               value={this.state.comments}
                               onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col className={'offset-sm-3'} sm={7}>
                        <Button type={'submit'}>Update Details</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    render() {
        const table = this.formTable();
        const formModal = this.formModalBody();
        const formUpdateModal = this.formUpdateModalBody();

        return(
            <div className='container-fluid'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Appointment Details</ModalHeader>
                    <ModalBody>
                        {formModal}
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isUpdateModalOpen} toggle={this.toggleUpdateModal}>
                    <ModalHeader toggle={this.toggleUpdateModal}>Update Appointment Details</ModalHeader>
                    <ModalBody>
                        {formUpdateModal}
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Appointment History</h4>
                        <hr/>
                    </div>
                </div>
                <div className={'row mb-2'}>
                    <div className={'col-12'}>
                        <Alert color={'success'} toggle={this.toggleAlert} isOpen={this.state.isAlertOpen}>
                            Successfully updated Appointment details
                        </Alert>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-12 col-lg-8'>
                        <div className='table-div'>
                            {table}
                        </div>
                    </div>
                    <div className={'col-12'}>
                        <hr className='m-0' />
                    </div>
                </div>
                <Row className='mb-3 align-self-center'>
                    <Col md={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={3}>
                                    <Input name='name' type='text'
                                           id='form-name' placeholder='Name'
                                           value={this.state.name}
                                           onChange={this.handleChange}
                                           onSubmit={this.handleSubmit}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Input name='date' type='text'
                                           id='form-date' placeholder='Date'
                                           value={this.state.date}
                                           onChange={this.handleChange}
                                           onSubmit={this.handleSubmit}
                                           onFocus={this.dateFocus}
                                           onBlur={this.dateBlur}
                                    />
                                </Col>
                                <Col md={3} style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                                    <Label check>
                                        <Input
                                            type='checkbox' name='details'
                                            checked={this.state.details} onChange={this.handleChange}
                                            style={{position: "relative", marginLeft: "0"}}
                                        /> {' '}
                                        Details Not Updated
                                    </Label>
                                </Col>
                                <Col>
                                    <Button type='submit' className='btn-dark'>
                                        <span className='fa fa-search'/>
                                    </Button>
                                    <Button onClick={this.handleClear} className='btn-danger mx-2'>
                                        <span className='fa fa-times'/>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default withRouter(AppointmentHistory);