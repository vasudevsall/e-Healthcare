import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Footer from "./FooterComponent";
import {Form, FormGroup, Label, Input, Col, Button, Alert} from 'reactstrap';
import FeedbackService from "../services/FeedbackService";

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            feedback: '',
            success: false,
            errMess: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    toggleAlert() {
        this.setState({
            success: !this.state.success
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        FeedbackService.postFeedback(this.state.name, this.state.phone, this.state.email, this.state.feedback)
            .then((resp) => {
                this.setState({
                    name: '',
                    phone: '',
                    email: '',
                    feedback: '',
                    success: true
                })
            }).catch((err) => {
                this.setState({
                    errMess: ''
                })
        })
    }

    render() {
        return(
            <>
                <div className='home-head'>
                    <div className='back-img'
                         style={{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/contact.jpg"}')`,
                             backgroundPosition: '50% 50%'}}>
                    </div>

                    <div className='home-overlay'>
                        <h1>Get in touch with us!</h1>
                    </div>
                </div>
                <div className='home-body contact'>
                    <div className={'container'}>
                        <div className={'row mb-3'}>
                            <div className={'col-12'}>
                                <h3 style={{textDecoration: 'underline'}} className={'mb-4'}>Contact Us</h3>
                                <h5 className={'text-center font-weight-bold'}>Call Us:   +91-12345-12345</h5>
                                <h5 className={'text-center font-weight-bold'}>Email  :   ehealthcare@gmail.com</h5>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <hr/>
                                <h3 style={{textDecoration: 'underline'}} className={'mb-4'}>
                                    Send Us Your Feedback
                                </h3>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <Alert color={'success'} isOpen={this.state.success} toggle={this.toggleAlert}>
                                    Thank You for submitting your feedback!
                                </Alert>
                            </div>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label sm={4}>Name</Label>
                                <Col sm={6}>
                                    <Input type={'text'} name={'name'}
                                           value={this.state.name}
                                           placeholder={'Name'}
                                           onChange = {this.handleChange}
                                           required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Phone Number</Label>
                                <Col sm={6}>
                                    <Input type={'number'} name={'phone'}
                                           value={this.state.phone}
                                           placeholder={'Phone'}
                                           onChange = {this.handleChange}
                                           required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Email</Label>
                                <Col sm={6}>
                                    <Input type={'text'} name={'email'}
                                           value={this.state.email}
                                           placeholder={'Email'}
                                           onChange = {this.handleChange}
                                           required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Feedback</Label>
                                <Col sm={6}>
                                    <Input type={'textarea'} name={'feedback'}
                                           value={this.state.feedback}
                                           onChange = {this.handleChange}
                                           required
                                           rows={6}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={6} className={'offset-sm-4'}>
                                    <Button type={'submit'}>
                                        Submit Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

                <Footer/>
            </>
        );
    }
}

export default withRouter(Contact);