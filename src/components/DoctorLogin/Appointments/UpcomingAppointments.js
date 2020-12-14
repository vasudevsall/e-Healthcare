import React, {Component} from 'react';
import DocService from "../../../services/DocService";
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Button, Col, Form, FormGroup, Input, Row, Table} from 'reactstrap';

class UpcomingAppointments extends Component {

    constructor(props) {
        super(props)
        this.state ={
            appointments: [],
            allAppointments: [],
            appointmentsAvailable: false,
            errMess: '',
            name: '',
            date: '',
            time: ''
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        DocService.getUpcomingAppointments()
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

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    dateFocus(event) {
        event.currentTarget.type = 'date';
    }
    dateBlur(event) {
        event.currentTarget.type = 'text';
        let name = event.target.name;
        event.currentTarget.placeholder = name.charAt(0).toUpperCase() + name.slice(1);
    }
    timeFocus(event) {
        event.currentTarget.type = 'time';
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
            let time = (this.state.time === '') ? '' : (this.state.time + ":00")
            let apptDate = this.formatDate(appointment.date)
            let apptTime = this.formatDate(appointment.date, false);
            if(name.includes(search) && apptDate.includes(dateStr) && apptTime.includes(time)) {
                filterAppointments.push(appointment);
            }
        }

        this.setState({
            appointments: filterAppointments
        })
    }

    handleClear() {
        this.setState({
            name: '',
            date: '',
            appointments: this.state.allAppointments
        });
    }

    formTable() {
        if(!this.state.appointmentsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            if(this.state.allAppointments.length === 0){
                return(
                    <div className='full-flex-span'>
                        <label>No Appointments scheduled</label>
                    </div>
                );
            }
            if(this.state.appointments.length === 0) {
                return(
                    <div className='full-flex-span'>
                        <label>No Appointments matching current filters</label>
                    </div>
                );
            }
            if(this.state.appointments.length > 0) {
                let counter = 1;
                const tableBody = this.state.appointments.map((appointment) => {
                    return(
                        <tr key={appointment.serial}>
                            <td>{counter++}</td>
                            <td>{`${appointment.user.firstName} ${appointment.user.lastName}`}</td>
                            <td>{this.formatDate(appointment.date)}</td>
                            <td>{this.formatDate(appointment.date, false)}</td>
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
                        <h4>Upcoming Appointments</h4>
                        <hr/>
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
                                    />
                                </Col>
                                <Col md={3}>
                                    <Input name='date' type='text'
                                           id='form-date' placeholder='Date'
                                           value={this.state.date}
                                           onChange={this.handleChange}
                                           onFocus={this.dateFocus}
                                           onBlur={this.dateBlur}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Input name='time' type='text'
                                           id='form-time' placeholder='Time'
                                           value={this.state.time}
                                           onChange={this.handleChange}
                                           onFocus={this.timeFocus}
                                           onBlur={this.dateBlur}
                                    />
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

export default withRouter(UpcomingAppointments);