import React, {Component} from 'react';
import UserService from '../../../services/UserService';
import {Form, FormGroup, Col, Input, Modal, ModalBody, ModalHeader, Button, Alert, Label} from 'reactstrap';

class UpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            old: '',
            password: '',
            passwordTwo: '',
            isModalOpen: false,
            successAlert: false,
            errAlert: false,
            errMess: '',
            successMess: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errAlertToggle = this.errAlertToggle.bind(this);
        this.successAlertToggle = this.successAlertToggle.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
            successAlert: false,
            errAlert: false
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    changePassword() {
        UserService.updatePassword(this.state.old, this.state.password)
        .then((resp) => {
            this.setState({
                old: '',
                password: '',
                passwordTwo: '',
                errMess: '',
                errAlert: false,
                successMess: resp.data,
                successAlert: true,
                isModalOpen: false
            })
        }).catch((err) => {
            this.setState({
                old: '',
                password: '',
                passwordTwo: '',
                errMess: err.response.data,
                successMess: '',
                errAlert: true,
                successAlert: false,
                isModalOpen: false
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.password === this.state.passwordTwo) {
            this.setState({
                isModalOpen: true
            });
        } else {
            this.setState({
                errMess: 'Both New Passwords must match',
                errAlert: true
            })
        }
    }

    errAlertToggle() {
        this.setState({
            errAlert: !this.state.errAlert
        })
    }

    successAlertToggle() {
        this.setState({
            successAlert: !this.state.successAlert
        })
    }

    render() {
        return(
            <div className='container-fluid'>
                <Modal centered isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are you Sure ?</ModalHeader>
                    <ModalBody>
                        <div className='full-flex-span mt-5'>
                            <Button onClick={this.changePassword} className='bg-success mx-3'>Confirm</Button>
                            <Button onClick={this.toggleModal} className='bg-danger mx-3'>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Update Password</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <Alert color='danger' isOpen={this.state.errAlert} toggle={this.errAlertToggle}>
                            {this.state.errMess}
                        </Alert>
                        <Alert color='success' isOpen={this.state.successAlert} toggle={this.successAlertToggle}>
                            {this.state.successMess}
                        </Alert>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4}>Old Password:</Label>
                        <Col sm={4}>
                            <Input
                                type='password'
                                name='old' id='form-password'
                                placeholder='Old Password' onChange={this.handleChange}
                                value={this.state.old} required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>New Password:</Label>
                        <Col sm={4}>
                            <Input
                                type='password'
                                name='password' id='form-password-new'
                                placeholder='New Password' onChange={this.handleChange}
                                value={this.state.password} required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Retype Password:</Label>
                        <Col sm={4}>
                            <Input
                                type='password'
                                name='passwordTwo' id='form-password-two'
                                placeholder='Retype Password' onChange={this.handleChange}
                                value={this.state.passwordTwo} required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='offset-sm-4' sm={4}>
                            <Button type='submit'>Change Password</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default UpdatePassword;