import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import InfoService from '../../../services/InfoService';
import UserService from '../../../services/UserService';
import AppointmentService from '../../../services/AppointmentService';

class ScheduleAppointment extends Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            phone: '',
            dob: '',
            gender: '',
            speciality: '',
            doctor: '',
            appointment: '',
            allSpeciality: [],
            ifAllSpeciality: false,
            errMess: '',
            specialityDoctors: [],
            doctorSchedule: [],
            isSchedule: false,
            successMess: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formatSchedule = this.formatSchedule.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        AppointmentService.scheduleAppointment(this.state.doctor, this.state.appointment)
            .then((resp) => {
                this.setState({
                    successMess: 'Appointment Scheduled Successfully!',
                    speciality: '',
                    doctor: '',
                    appointment: ''
                });
            }).catch((err) => {
                this.setState({
                    errMess: 'Error: unable to schedule! Please try again later'
                });
            })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });

        if(name === 'speciality') {
            InfoService.getSpecialistDoctors(value)
                .then((resp) => {
                    this.setState({
                        specialityDoctors: resp.data
                    })
                })
                .catch((err) => {
                    this.setState({
                        errMess: 'An error occured'
                    })
                });
        }

        if(name === 'doctor') {
            InfoService.getDoctorSchedule(value)
                .then((resp) => {
                    this.setState({
                        doctorSchedule: resp.data,
                        isSchedule: true
                    })
                })
                .catch((err) => {
                    this.setState({
                        errMess: 'An error occured'
                    })
                })
        }
    }

    componentDidMount() {
        this.toUnmout = false;

        InfoService.getAllSpeciality()
        .then((resp) => {
            if(!this.toUnmout) {
                this.setState({
                    allSpeciality: resp.data,
                    ifAllSpeciality: true
                })
            }
        })
        .catch((err) => {
            if(!this.toUnmout) {
                this.setState({
                    errMess: 'An error occured'
                })
            }
        });

        UserService.getUserDetails()
        .then((resp) => {
            if(!this.toUnmout) {
                let dt = resp.data.dateOfBirth.split("-");
                let formattedDate = `${dt[2]}-${dt[1]}-${dt[0]}`
                this.setState({
                    name: resp.data.name,
                    phone: resp.data.phoneNumber,
                    gender: resp.data.gender,
                    dob: formattedDate
                })
            }
        })

    }

    componentWillUnmount() {
        this.toUnmout = true;
    }

    formatSchedule() {
        let obj = this.state.doctorSchedule;
        let date = new Date();
        let day = date.getDay();
        let returnArr = [];
        let nextDay = new Date(date);

        switch(day) {
            case 0:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("Mon, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t0);
                returnArr.push("Mon, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t1);
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Tue, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t2);
                returnArr.push("Tue, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t3);
                break;
            
            case 1:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("Tue, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t2);
                returnArr.push("Tue, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t3);
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Wed, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t4);
                returnArr.push("Wed, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t5);
                break;
            
            case 2:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("wed, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t4);
                returnArr.push("Wed, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t5);
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Thr, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t6);
                returnArr.push("Thr, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t7);
                break;
            
            case 3:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("Thr, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t6);
                returnArr.push("Thr, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t7);
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Fri, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t8);
                returnArr.push("Fri, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t9);
                break;

            case 4:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("Fri, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t8);
                returnArr.push("Fri, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t9);
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Sat, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t10);
                returnArr.push("Sat, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t11);
                break;
            
            case 5:
                nextDay.setDate(date.getDate() + 1);
                returnArr.push("Sat, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t10);
                returnArr.push("Sat, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t11);
                break;
            
            case 6:
                nextDay.setDate(date.getDate() + 2);
                returnArr.push("Mon, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t0);
                returnArr.push("Mon, " + nextDay.getFullYear()+"-"+(nextDay.getMonth() + 1)+"-"+nextDay.getDate()+", " + obj.t1);
                break;
            
            default:

        }
        return returnArr;
    }

    render() {
        const speciality = this.state.allSpeciality.map((speciality)=> {
            return(
                <option key={speciality.specialityName}>{speciality.specialityName}</option>
            );
        });

        const docSpeciality = this.state.specialityDoctors.map((doc) => {
            return(
                <option key={doc.doctor.id} value={doc.doctor.id}>{`Dr. ${doc.doctor.firstName} ${doc.doctor.lastName}`}</option>
            );
        });

        const schedule = this.formatSchedule().map((date) => {
            if(!this.state.isSchedule) {
                return(<></>)
            }
            let d = date.split(",");
            let t = d[2].split("-");
            let val = d[1] +" "+ t[0];
            return(
                <option key={val} value={val}>{date}</option>
            );
        });
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>New Appointment</h4>
                        <hr/>
                    </div>
                </div>
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Label htmlFor='form-name' sm={4}>Patient Name:</Label>
                        <Col sm={6}>
                            <Input type='text' name='name' id='form-name'
                                placeholder='Patient Name' value={this.state.name} 
                                onChange = {this.handleChange}
                                required disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-phone' sm={4}>Phone Number:</Label>
                        <Col sm={6}>
                            <Input type='text' name='phone' id='form-phone'
                                placeholder='Enter without +91' value={this.state.phone}
                                onChange = {this.handleChange}
                                required disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-dob' sm={4}>Date Of Birth:</Label>
                        <Col sm={6}>
                            <Input type='date' name='dob' id='form-dob'
                                placeholder='Date Of Birth' value={this.state.dob}
                                onChange = {this.handleChange}
                                disabled required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='Gender' sm={4}>Gender:</Label>
                        <Col sm={6}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'M'} 
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'M'}
                                                disabled
                                            />{' '}
                                            Male
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'F'}
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'F'}
                                                disabled
                                            />{' '}
                                            Female
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'O'}
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'O'}
                                                disabled
                                            />{' '}
                                            Other
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-speciality'>Select Speciality:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.speciality}
                                name='speciality' id='form-speciality' placeholder='Select One'
                                onChange = {this.handleChange}
                            >
                                <option selected disabled hidden value=''>Select One</option>
                                {speciality}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-doctor'>Select Doctor:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.doctor}
                                name='doctor' id='form-doctor' placeholder='Select One'
                                onChange = {this.handleChange}
                            >
                                <option selected disabled hidden value=''>Select One</option>
                                {docSpeciality}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-appointment'>Select Doctor:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.appointment}
                                name='appointment' id='form-appointment' placeholder='Select One'
                                onChange = {this.handleChange}
                            >
                                <option selected disabled hidden value=''>Select One</option>
                                {schedule}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='offset-sm-4' sm={3}>
                            <Input type='submit' value='Schedule'/>
                        </Col>
                    </FormGroup>
                </Form>
                <div className='row'>
                    <div className='col-12 text-success'>
                        {this.state.successMess}
                    </div>
                    <div className='col-12 text-danger'>
                        {this.state.errMess}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ScheduleAppointment);