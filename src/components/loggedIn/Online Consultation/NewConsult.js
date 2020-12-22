import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Form, FormGroup, Input, Label, Button, Col, Alert} from 'reactstrap';
import InfoService from "../../../services/InfoService";
import ConsultService from "../../../services/ConsultService";

class NewConsultation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            speciality: '',
            allSpeciality: [],
            ifAllSpeciality: false,
            specialityDoctors: [],
            errMess: '',
            doctor: '',
            title: '',
            details: '',
            successAlert: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        ConsultService.postConsultation(this.state.doctor, this.state.title, this.state.details)
            .then((resp) => {
                this.setState({
                    successAlert: true,
                    errMess: '',
                    speciality: '',
                    doctor: '',
                    title: '',
                    details: ''
                })
            }).catch((err) => {
                this.setState({
                    successAlert: false,
                    errMess: err.response.data
                })
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
    }

    componentDidMount() {
        this.toUnmout = false;

        InfoService.getAllSpeciality()
            .then((resp) => {
                if (!this.toUnmout) {
                    this.setState({
                        allSpeciality: resp.data,
                        ifAllSpeciality: true
                    })
                }
            }).catch((err) => {
                if (!this.toUnmout) {
                    this.setState({
                        errMess: 'An error occured'
                    })
                }
            });
    }

    toggleError() {
        this.setState({
            errMess: ''
        })
    }

    toggleSuccess() {
        this.setState({
            successAlert: !this.state.successAlert
        })
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
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Online Consult</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <Alert color={'danger'} isOpen={this.state.errMess !== ''} toggle={this.toggleError}>
                            {this.state.errMess}
                        </Alert>
                    </div>
                    <div className='col-12'>
                        <Alert color={'success'} isOpen={this.state.successAlert} toggle={this.toggleSuccess}>
                            Successfully started a new chat. Go to Ongoing Consultation Page for updates.
                        </Alert>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-speciality'>Select Speciality:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.speciality}
                                   name='speciality' id='form-speciality' placeholder='Select One'
                                   onChange = {this.handleChange}
                                   required
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
                                   required
                            >
                                <option selected disabled hidden value=''>Select One</option>
                                {docSpeciality}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} className={'d-flex align-items-center'} htmlFor='form-title'>Title:</Label>
                        <Col sm={6}>
                            <Input type='textarea' value={this.state.title}
                                   name='title' id='form-title' placeholder='Title'
                                   onChange={this.handleChange}
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} className={'d-flex align-items-center'} htmlFor='form-details'>Details:</Label>
                        <Col sm={6}>
                            <Input type='textarea' value={this.state.details}
                                   name='details' id='form-details' placeholder='Explain Your Concern Briefly'
                                   onChange={this.handleChange}
                                   required
                                   rows={5}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='offset-sm-4' sm={6}>
                            <Button type='submit'>
                                Send Message
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewConsultation);