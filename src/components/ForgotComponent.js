import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Form, Input} from "reactstrap";
import UserService from "../services/UserService";

class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errMess: '',
            successMess: '',
            username: '',
            phone: '',
            email: '',
            blood: '',
            password: '',
            passwordTwo: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.password !== this.state.passwordTwo) {
            this.setState({
                errMess: 'Both passwords must match'
            })
            return;
        }
        UserService.forgotPassword(this.state.username, this.state.phone, this.state.email,
            this.state.blood, this.state.password)
            .then((resp) => {
                this.setState({
                    successMess: resp.data,
                    username: '',
                    phone: '',
                    email: '',
                    blood: '',
                    password: '',
                    passwordTwo: '',
                    errMess: ''
                })
            }).catch((err) => {
                this.setState({
                    errMess: err.response.data,
                    successMess: ''
                })
        })
    }

    render() {
        return(
            <>
                <div className="login-back full-back"
                     style = {{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/homepage.jpg"}')`}}/>

                <div className={'login-overlay full-back register'}>
                    <div className = 'login-complete register-complete'>
                        <div className = 'login-info register-info d-none d-md-block'/>
                        <div className = 'login-form register-form'>
                            <h4 className='mb-1 mb-md-2'>Reset Password</h4>
                            <div className = {`container ${(this.state.errMess === '')? 'd-none': ''}`}>
                                <label className = 'login-error' style={{color: 'red'}}>{this.state.errMess}</label>
                            </div>
                            <div className = {`container ${(this.state.successMess === '')? 'd-none': ''}`}>
                                <label className = 'login-error text-success'>
                                    {this.state.successMess}
                                </label>
                            </div>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>
                                <div className = 'container'>
                                    <div className={`row mt-4 mb-3`}>
                                        <label className='col-sm-4 col-12'>Username</label>
                                        <Input value = {this.state.username}
                                               type='text'
                                               id = 'login-username'
                                               name = 'username'
                                               onChange = {this.handleChange}
                                               className = 'col-12 col-sm-6 offset-sm-1'
                                               placeholder= 'Username'
                                               required
                                        />
                                    </div>

                                    <div className={`row mb-3`}>
                                        <label className='col-sm-4 col-12'>Phone Number</label>
                                        <Input value = {this.state.phone}
                                               type='text'
                                               id = 'login-phone'
                                               name = 'phone'
                                               onChange = {this.handleChange}
                                               className = 'col-12 col-sm-6 offset-sm-1'
                                               placeholder= 'Phone Number'
                                               required
                                        />
                                    </div>

                                    <div className={`row mb-3`}>
                                        <label className='col-sm-4 col-12'>Email</label>
                                        <Input value = {this.state.email}
                                               type='text'
                                               id = 'login-email'
                                               name = 'email'
                                               onChange = {this.handleChange}
                                               className = 'col-12 col-sm-6 offset-sm-1'
                                               placeholder= 'Email'
                                               required
                                        />
                                    </div>

                                    <div className={`row mb-3`}>
                                        <label className='col-sm-4 col-12'>Blood Group</label>
                                        <Input type='select' name='blood' id={'form-blood'}
                                               placeHolder={'Blood Group'} value={this.state.blood}
                                               onChange={this.handleChange} required
                                               className = 'col-12 col-sm-6 offset-sm-1'
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
                                    </div>

                                    <div className={`row mb-3`}>
                                        <label className='col-sm-4 col-12'>Password</label>
                                        <Input value = {this.state.password}
                                               type='password'
                                               id = 'login-password'
                                               name = 'password'
                                               onChange = {this.handleChange}
                                               className = 'col-12 col-sm-6 offset-sm-1'
                                               placeholder= 'Password'
                                               style={{paddingRight: '30px'}}
                                               required
                                        />
                                    </div>

                                    <div className={`row mb-3`}>
                                        <label className='col-sm-4 col-12'>Retype Password</label>
                                        <Input value = {this.state.passwordTwo}
                                               type='password'
                                               id = 'login-password-two'
                                               name = 'passwordTwo'
                                               onChange = {this.handleChange}
                                               className = 'col-12 col-sm-6 offset-sm-1'
                                               placeholder= 'Retype Password'
                                               style={{paddingRight: '30px'}}
                                               required
                                        />
                                    </div>

                                    <div className='row mb-1'>
                                        <div className='col-sm-6 offset-sm-5 col-12' style={{padding: 0}}>
                                            <input type='submit'
                                                   className='login-submit-button'
                                                   value= 'Reset'
                                            />
                                        </div>
                                        <div className='col'/>
                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-6 offset-sm-5 col-12' style={{padding: 0}}>
                                            <Link to='/login' className='login-submit-button'>
                                                Login
                                            </Link>
                                        </div>
                                        <div className='col'/>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Forgot);