import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Form, FormFeedback, Input} from "reactstrap";
import UserService from "../services/UserService";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            dateOfBirth: '',
            gender: '',
            phone: '',
            passwordTwo: '',
            email: '',
            errMess: '',
            successMess: '',
            blood: '',
            touched: {
                firstName: false,
                lastName: false,
                phone: false,
                username: false,
                password: false,
                passwordTwo: false,
                email: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.validate = this.validate.bind(this);
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

    handleFocus(field) {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate(firstName, lastName, phone, username, password, passwordTwo, email) {
        const errors = {
            firstName: '',
            lastName: '',
            phone: '',
            username: '',
            password: '',
            passwordTwo: '',
            email: ''
        }

        if(this.state.touched.firstName && firstName.length < 3)
            errors.firstName = 'First Name should have at least 3 characters';
        if(this.state.touched.firstName && firstName.length > 10)
            errors.firstName = 'First Name should not have more than 10 characters';

        if(this.state.touched.lastName && lastName.length < 3)
            errors.lastName = 'Last Name should have at least 3 characters';
        if(this.state.touched.lastName && lastName.length > 10)
            errors.lastName = 'Last Name should not have more than 10 characters';

        const reg = /^\d+$/;
        if(this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Phone Number can only contain numbers';
        if(this.state.touched.phone && phone.length !== 10 )
            errors.phone = 'Phone Number must have 10 digits';

        if(this.state.touched.username && username.length < 5)
            errors.username = 'Username should have at least 5 characters';
        if(this.state.touched.username && username.length > 20)
            errors.username = 'Username should not have more than 20 characters';

        if(this.state.touched.password && password.length < 5)
            errors.password = 'Password should have at least 5 characters';
        if(this.state.touched.password && password.length > 15)
            errors.password = 'Password should not have more than 15 characters';

        if(this.state.touched.passwordTwo && passwordTwo !== password)
            errors.passwordTwo = 'Both passwords must be same';

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        return errors;
    }

    handleSubmit(event, errors) {
        event.preventDefault();
        let flag = 0;
        for(const err in errors) {
            if(errors[err] !== '') {
                this.setState({
                    errMess: 'Please input valid data'
                })
                flag = 1;
            }
        }

        if(flag === 0) {
            UserService.registerUser(this.state.username, this.state.password, this.state.phone,
                this.state.firstName, this.state.lastName, this.state.gender, this.state.dateOfBirth,
                this.state.email, this.state.blood
            ).then((resp) => {
                this.setState({
                    username: '',
                    firstName: '',
                    dateOfBirth: '',
                    password: '',
                    passwordTwo: '',
                    phone: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    errMess: '',
                    blood: '',
                    touched: {
                        firstName: false,
                        lastName: false,
                        phone: false,
                        username: false,
                        password: false,
                        passwordTwo: false,
                        email: false
                    },
                    successMess: 'Successfully registered! Please login using the details'
                })
            }).catch((err) => {
                this.setState({
                    errMess: err.response.data.errorMessage
                })
            })
        }
    }

    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName,
            this.state.phone, this.state.username, this.state.password, this.state.passwordTwo, this.state.email);
        return(
            <div className="register-background">
                <div className="login-back full-back register-back register-image"
                     style = {{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/Register.jpg"}')`}}
                />
                <div className={'login-overlay full-back register'}>
                    <div className = 'container'>
                        <div className = 'login-complete register-complete'>
                            <div className = 'login-info register-info d-none d-md-block'/>
                            <div className = 'login-form register-form'>
                                <h4 className='mb-1 mb-md-2'>Sign Up</h4>
                                <div className = {`container ${(this.state.errMess === '')? 'd-none': ''}`}>
                                    <label className = 'login-error' style={{color: 'red'}}>{this.state.errMess}</label>
                                </div>
                                <div className = {`container ${(this.state.successMess === '')? 'd-none': ''}`}>
                                    <label className = 'login-error text-success'>
                                        {this.state.successMess}
                                    </label>
                                </div>
                                <Form onSubmit={(event) => this.handleSubmit(event, errors)}>
                                    <div className = 'container'>
                                        <div className={`row mt-4 ${(errors.username === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Username</label>
                                            <Input value = {this.state.username}
                                                   type='text'
                                                   id = 'login-username'
                                                   name = 'username'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Username'
                                                   onFocus = {() => this.handleFocus('username')}
                                                   valid={errors.username === '' && this.state.username !== ''}
                                                   invalid={errors.username !== ''}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.username}
                                            </FormFeedback>
                                        </div>

                                        <div className={`row ${(errors.firstName === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>First Name</label>
                                            <Input value = {this.state.firstName}
                                                   type='text'
                                                   id = 'login-first'
                                                   name = 'firstName'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'First Name'
                                                   onFocus = {() => this.handleFocus('firstName')}
                                                   valid={errors.firstName === '' && this.state.firstName !== ''}
                                                   invalid={errors.firstName !== ''}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.firstName}
                                            </FormFeedback>
                                        </div>

                                        <div className={`row ${(errors.lastName === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Last Name</label>
                                            <Input value = {this.state.lastName}
                                                   type='text'
                                                   id = 'login-last'
                                                   name = 'lastName'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Last Name'
                                                   onFocus = {() => this.handleFocus('lastName')}
                                                   valid={errors.lastName === '' && this.state.lastName !== ''}
                                                   invalid={errors.lastName !== ''}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.lastName}
                                            </FormFeedback>
                                        </div>

                                        <div className={`row ${(errors.phone === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Phone Number</label>
                                            <Input value = {this.state.phone}
                                                   type='text'
                                                   id = 'login-phone'
                                                   name = 'phone'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Phone Number'
                                                   onFocus = {() => this.handleFocus('phone')}
                                                   valid={errors.phone === '' && this.state.phone !== ''}
                                                   invalid={errors.phone !== ''}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.phone}
                                            </FormFeedback>
                                        </div>

                                        <div className={`row ${(errors.email === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Email</label>
                                            <Input value = {this.state.email}
                                                   type='text'
                                                   id = 'login-email'
                                                   name = 'email'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Email'
                                                   onFocus = {() => this.handleFocus('email')}
                                                   valid={errors.email === '' && this.state.email !== ''}
                                                   invalid={errors.email !== ''}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.email}
                                            </FormFeedback>
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
                                            <label className='col-sm-4 col-12'>Birth Date</label>
                                            <Input value = {this.state.dateOfBirth}
                                                   type='date'
                                                   id = 'login-date'
                                                   name = 'dateOfBirth'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Birth Date'
                                                   required
                                            />
                                        </div>

                                        <div className={`row mb-3`}>
                                            <label className='col-sm-4 col-12'>Gender</label>
                                            <Input value = {this.state.gender}
                                                   type='select'
                                                   id = 'login-gender'
                                                   name = 'gender'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Gender'
                                                   required
                                            >
                                                <option value='' selected disabled hidden>Select One</option>
                                                <option value='M'>Male</option>
                                                <option value='F'>Female</option>
                                                <option value='O'>Other</option>
                                            </Input>
                                        </div>

                                        <div className={`row ${(errors.password === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Password</label>
                                            <Input value = {this.state.password}
                                                   type='password'
                                                   id = 'login-password'
                                                   name = 'password'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Password'
                                                   onFocus = {() => this.handleFocus('password')}
                                                   valid={errors.password === '' && this.state.password !== ''}
                                                   invalid={errors.password !== ''}
                                                   style={{paddingRight: '30px'}}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.password}
                                            </FormFeedback>
                                        </div>

                                        <div className={`row ${(errors.passwordTwo === '')? 'mb-3' : ''}`}>
                                            <label className='col-sm-4 col-12'>Retype Password</label>
                                            <Input value = {this.state.passwordTwo}
                                                   type='password'
                                                   id = 'login-password-two'
                                                   name = 'passwordTwo'
                                                   onChange = {this.handleChange}
                                                   className = 'col-12 col-sm-6 offset-sm-1'
                                                   placeholder= 'Retype Password'
                                                   onFocus = {() => this.handleFocus('passwordTwo')}
                                                   valid={errors.passwordTwo === '' && this.state.passwordTwo !== ''}
                                                   invalid={errors.passwordTwo !== ''}
                                                   style={{paddingRight: '30px'}}
                                                   required
                                            />
                                            <FormFeedback className='offset-sm-5 register-feedback'>
                                                {errors.passwordTwo}
                                            </FormFeedback>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-sm-6 offset-sm-5 col-12' style={{padding: 0}}>
                                                <input type='submit'
                                                       className='login-submit-button'
                                                       value= 'Sign Up'
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
                </div>
            </div>
        );
    }
}

export default Register;