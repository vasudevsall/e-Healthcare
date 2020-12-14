import React, {Component} from 'react';
import UserService from '../../../services/UserService';
import {Form, FormGroup, Button, Input, Label, Col, Row, Modal, ModalHeader, ModalBody, Alert} from 'reactstrap';
 
class UpdateInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsAvailable: false,
            errMess: '',
            username: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            blood: '',
            gender: '',
            dateOfBirth: '',
            password: '',
            modalErr: '',
            successAlert: false,
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        UserService.getUserDetails()
        .then((resp) => {
            let name = resp.data.name.split(' ');
            let first = name[0];
            for(let i=1; i<name.length - 1; i++) {
                first = first + ' ' + name[i];
            }
            let date = resp.data.dateOfBirth.split("-");
            if(!this.toUnmount) {
                this.setState({
                    detailsAvailable: true,
                    username: resp.data.username,
                    firstName: first,
                    lastName: name[name.length-1],
                    phoneNumber: resp.data.phoneNumber,
                    gender: resp.data.gender,
                    dateOfBirth: date[2] + "-" + date[1] + "-" + date[0],
                    email: resp.data.email,
                    blood: resp.data.blood
                })
            }
        }).catch((err) => {
            if(!this.toUnmount) {
                this.setState({
                    errMess: "Error Fetching User Details"
                })
            }
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isModalOpen: true
        })
    }

    handleModalSubmit(event) {
        event.preventDefault();
        UserService.updateUserDetails(this.state.username, this.state.password, this.state.firstName,
            this.state.lastName, this.state.phoneNumber, this.state.email, this.state.blood,
            this.state.gender, this.state.dateOfBirth
        ).then((resp) => {
            UserService.getUserDetails()
            .then((resp) => {
                let name = resp.data.name.split(' ');
                let first = name[0];
                for(let i=1; i<name.length - 1; i++) {
                    first = first + ' ' + name[i];
                }
                let date = resp.data.dateOfBirth.split("-");
                this.setState({
                    detailsAvailable: true,
                    username: resp.data.username,
                    firstName: first,
                    lastName: name[name.length-1],
                    phoneNumber: resp.data.phoneNumber,
                    gender: resp.data.gender,
                    dateOfBirth: date[2] + "-" + date[1] + "-" + date[0],
                    isModalOpen: false,
                    successAlert: true,
                    password: '',
                    email: resp.data.email,
                    blood: resp.data.blood
                })
            }).catch((err) => {
                this.setState({
                    errMess: "Error Fetching User Details"
                })
            })
        }).catch((err) => {
            this.setState({
                modalErr: err.response.data,
                password: ''
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
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            password: '',
            modalErr: ''
        });
    }

    toggleAlert() {
        this.setState({
            successAlert: !this.state.successAlert
        })
    }

    render() {
        return(
            <div className='fluid-container'>
                <Modal centered isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Enter Your Password to Continue!</ModalHeader>
                    <ModalBody>
                        <div className='row mb-2'>
                            <div className='col-12 text-danger font-weight-bold'>
                                {this.state.modalErr}
                            </div>
                        </div>
                        <Form onSubmit={this.handleModalSubmit}>
                            <FormGroup row>
                                <Label id='form-password' sm={4}>Password:</Label>
                                <Col sm={8}>
                                    <Input
                                        type='password'
                                        name='password' id='form-password'
                                        placeholder='Password' onChange={this.handleChange}
                                        value={this.state.password} required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col className='offset-sm-4' sm={8}>
                                    <Button block type='submit'>Confirm</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Update Details</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <Alert color='success' isOpen={this.state.successAlert} toggle={this.toggleAlert}>
                            Successfully updated your information!
                        </Alert>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='form-username' sm={4}>Username:</Label>
                                <Col sm={4}>
                                    <Input
                                        type='text'
                                        value={this.state.username} id='form-username'
                                        name='username' placeholder='Username'
                                        onChange={this.handleChange}
                                        required disabled
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='form-first' sm={4}>First Name:</Label>
                                <Col sm={4}>
                                    <Input
                                        type='text'
                                        value={this.state.firstName} id='form-first'
                                        name='firstName' placeholder='First Name'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='form-last' sm={4}>Last Name:</Label>
                                <Col sm={4}>
                                    <Input
                                        type='text'
                                        value={this.state.lastName} id='form-last'
                                        name='lastName' placeholder='Last Name'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='form-phone' sm={4}>Phone Number:</Label>
                                <Col sm={4}>
                                    <Input
                                        type='text'
                                        value={this.state.phoneNumber} id='form-phone'
                                        name='phoneNumber' placeholder='Phone Number'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='form-mail' sm={4}>Email:</Label>
                                <Col sm={4}>
                                    <Input type='text' name='email' id='form-mail'
                                           placeholder='Email' value={this.state.email}
                                           onChange = {this.handleChange}
                                           required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='form-blood' sm={4}>Blood Group:</Label>
                                <Col sm={4}>
                                    <Input type='select' name='blood' id={'form-blood'}
                                           placeHolder={'Blood Group'} value={this.state.blood}
                                           onChange={this.handleChange} required
                                    >
                                        <option selected disabled hidden value={''}>Select One</option>
                                        <option value={'A+'}>A+</option>
                                        <option value={'A-'}>A-</option>
                                        <option value={'B+'}>B+</option>
                                        <option value={'B-'}>B-</option>
                                        <option value={'AB+'}>AB-</option>
                                        <option value={'AB-'}>AB+</option>
                                        <option value={'O+'}>O+</option>
                                        <option value={'O-'}>O-</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='Gender' sm={4}>Gender:</Label>
                                <Col sm={5} className='pt-2'>
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
                                <Label htmlFor='form-dob' sm={4}>Date Of Birth:</Label>
                                <Col sm={4}>
                                    <Input type='date' name='dateOfBirth' id='form-dob'
                                        placeholder='Date Of Birth' value={this.state.dateOfBirth}
                                        onChange = {this.handleChange}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={3} className='offset-sm-4'>
                                    <Button type='submit' block>Update</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateInfo;