import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: ''
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
        this.setState({
            name: '',
            password: ''
        });
    }

    render() {
        return(
            <>
                <div className="login-back full-back"
                    style = {{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/loginPage.jpg"}')`}}></div>
                <div className='login-overlay full-back'>
                    <div className = 'container'>
                        <div className = 'login-complete'>
                            <div className = 'login-info d-none d-md-block'>
                                <h4>Customer Login</h4>
                                <ul>
                                    <li>Manage Everything Online</li>
                                    <li>Contact a doctor 24 x 7</li>
                                    <li>Easy Appointments</li>
                                    <li>Emergency Services</li>
                                </ul>
                            </div>
                            <div className = 'login-form'>
                                <h4 className='mb-1 mb-md-4'>Sign In</h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className = 'container'>
                                        <div className='row mb-4'>
                                            <label className='mb-2 col-sm-3 col-12'>Username</label>
                                            <input value = {this.state.name}
                                                type='text'
                                                id = 'login-name'
                                                name = 'name'
                                                onChange = {this.handleChange}
                                                className = 'col-12 col-sm-7 offset-sm-1'
                                                placeholder= 'Enter Username'
                                                required
                                            />
                                        </div>

                                        <div className='row mb-2'>
                                            <label className='mb-2 col-sm-3 col-12'>Password</label>
                                            <input value = {this.state.password}
                                                type='password'
                                                id = 'login-password'
                                                name = 'password'
                                                onChange = {this.handleChange}
                                                className = 'col-sm-7 col-12 offset-sm-1'
                                                placeholder = 'Enter Password'
                                                required
                                            />
                                        </div>

                                        <div className='row mb-4'>
                                            <div className='offset-sm-4 col-sm-7 col-12 forget-div'>
                                                <Link to='/forgot' className='forgot-link'>Forgot Password ?</Link>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-sm-7 offset-sm-4 col-12' style={{padding: 0}}>
                                                <input type='submit'
                                                    className='login-submit-button'
                                                    value= 'Login'
                                                />
                                            </div>
                                            <div className='col'></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;