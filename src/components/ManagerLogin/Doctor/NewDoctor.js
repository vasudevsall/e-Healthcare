import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Col, Row} from 'reactstrap';
import DoctorService from '../../../services/DoctorService';
import InfoService from '../../../services/InfoService';

class NewDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMess: '',
            firstName: '',
            lastName: '',
            username: '',
            phone: '',
            gender: '',
            dob: '',
            qualification: '',
            experience: '',
            speciality: 0,
            successMess: '',
            allSpecialities: [],
            allSpecialitiesAvailable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        DoctorService.addNewDoctor(this.state.username, this.state.firstName, this.state.lastName, this.state.gender,
            this.state.phone, this.state.qualification, this.state.experience, this.state.speciality, this.state.dob
        ).then((resp) => {
            this.setState({
                successMess: resp.data,
                errMess: '',
                username: '',
                firstName: '',
                lastName: '',
                gender: '',
                dob: '',
                phone: '',
                qualification: '',
                experience: '',
                speciality: 0
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                username: '',
                phone: '',
                errMess: err.response.data
            })
        });
    }

    componentDidMount() {
        this.toUnmout = false;

        InfoService.getAllSpeciality()
        .then((resp) => {
            console.log(resp.data);
            if(!this.toUnmout) {
                this.setState({
                    allSpecialities: resp.data,
                    allSpecialitiesAvailable: true
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
    }

    componentWillUnmount() {
        this.toUnmout = true;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
            successMess: '',
            errMess: ''
        });

    }

    render() {
        console.log(this.state.allSpecialities);
        const speciality = this.state.allSpecialities.map((speciality)=> {
            return(
                <option key={speciality.id} value={speciality.id}>{speciality.specialityName}</option>
            );
        });

        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Add New Doctor</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12 text-danger'>
                        {this.state.errMess}
                    </div>
                    <div className='col-12 text-success'>
                        {this.state.successMess}
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor='form-name' sm={4}>First Name:</Label>
                        <Col sm={4}>
                            <Input type='text' name='firstName' id='form-name'
                                placeholder='First Name' value={this.state.firstName} 
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-name' sm={4}>Last Name:</Label>
                        <Col sm={4}>
                            <Input type='text' name='lastName' id='form-name'
                                placeholder='Last Name' value={this.state.lastName} 
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-username' sm={4}>Username:</Label>
                        <Col sm={4}>
                            <Input type='text' name='username' id='form-username'
                                placeholder='Enter Username' value={this.state.username}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-phone' sm={4}>Phone Number:</Label>
                        <Col sm={4}>
                            <Input type='text' name='phone' id='form-phone'
                                placeholder='Enter without +91' value={this.state.phone}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-dob' sm={4}>Date Of Birth:</Label>
                        <Col sm={4}>
                            <Input type='date' name='dob' id='form-dob'
                                placeholder='Date Of Birth' value={this.state.dob}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='Gender' sm={4}>Gender:</Label>
                        <Col sm={6} md={5}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'M'} 
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'M'}
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
                        <Col sm={4}>
                            <Input type='select' value={this.state.speciality}
                                name='speciality' id='form-speciality' placeholder='Select One'
                                onChange = {this.handleChange}
                            >
                                <option selected disabled hidden value={0}>Select One</option>
                                {speciality}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-qualification' sm={4}>Qualification:</Label>
                        <Col sm={4}>
                            <Input type='text' name='qualification' id='form-qualification'
                                placeholder='Qualification' value={this.state.qualification}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-experience' sm={4}>Experience:</Label>
                        <Col sm={4}>
                            <Input type='number' name='experience' id='form-experience'
                                placeholder='Exter experience' value={this.state.experience}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='offset-4' sm={4}>
                            <Button type='submit'>
                                Add Doctor
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewDoctor);