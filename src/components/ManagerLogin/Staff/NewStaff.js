import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Col, Row} from 'reactstrap';
import StaffService from '../../../services/StaffService';

class NewStaff extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMess: '',
            name: '',
            phoneNumber: '',
            gender: '',
            birth: '',
            qualification: '',
            successMess: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        StaffService.registerStaff(this.state.name, this.state.address, this.state.phoneNumber, this.state.gender,
            this.state.birth, this.state.qualification
        ).then((resp) => {
            this.setState({
                successMess: resp.data,
                errMess: '',
                name: '',
                phoneNumber: '',
                gender: '',
                birth: '',
                qualification: ''
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                name: '',
                phoneNumber: '',
                errMess: err.response.data
            })
        });
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

        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Add New Staff Member</h4>
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
                            <Input type='text' name='name' id='form-name'
                                placeholder='Name' value={this.state.name} 
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-address' sm={4}>Address:</Label>
                        <Col sm={4}>
                            <Input type='text' name='address' id='form-address'
                                placeholder='Address' value={this.state.address} 
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-phone' sm={4}>Phone Number:</Label>
                        <Col sm={4}>
                            <Input type='text' name='phoneNumber' id='form-phone'
                                placeholder='Enter without +91' value={this.state.phoneNumber}
                                onChange = {this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-birth' sm={4}>Date Of Birth:</Label>
                        <Col sm={4}>
                            <Input type='date' name='birth' id='form-birth'
                                placeholder='Date Of Birth' value={this.state.birth}
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
                        <Col className='offset-4' sm={4}>
                            <Button type='submit'>
                                Add Staff Member
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(NewStaff);