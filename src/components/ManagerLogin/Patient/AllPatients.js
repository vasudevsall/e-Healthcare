import React, {Component} from 'react';
import PatientService from '../../../services/PatientService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table, Form, FormGroup, Input, Label, Col, Button, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

class AllPatients extends Component {

    constructor(props) {
        super(props)
        this.state ={
            patients: [],
            patientsAvailable: false,
            errMess: '',
            name: ''
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.printGender = this.printGender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        PatientService.getAllPatients()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        patients: resp.data,
                        patientsAvailable: true
                    });
                }
            })
            .catch((err) => {
                UserService.verifyLogin()
                    .then((resp) => {
                        if(!this.toUnmount) {
                            this.setState({
                                errMess: 'An error occured'
                            });
                        }
                    }).catch((err) => {
                        this.props.history.push('/login');
                    });
            });
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    formatDate(date, noTime = true) {
        let dt = date.split("T");
        let ymd = dt[0].split("-");
        let time = dt[1].split("+");
        let t = time[0].split(".");
        if(noTime)
            return (ymd[2] + "-" + ymd[1] + "-" + ymd[0]);
        return t[0];
    }

    printGender(gend) {
        if(gend === 'M') {
            return "Male";
        } else if(gend === 'F') {
            return "Female";
        }
        return "Other";
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            patientsAvailable: false
        });
        PatientService.getPatientByName(this.state.name)
            .then((resp) => {
                this.setState({
                    patients: resp.data,
                    patientsAvailable: true
                })
            })
    }

    formTable() {
        if(!this.state.patientsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            let counter = 1;
            const tableBody = this.state.patients.map((patient) => {
                return(
                    <tr key={patient.id}>
                        <td>{counter++}</td>
                        <td>{`${patient.firstName} ${patient.lastName}`}</td>
                        <td>{patient.username}</td>
                        <td>{patient.phoneNumber}</td>
                        <td>{this.printGender(patient.gender)}</td>
                        <td>{this.formatDate(patient.dateOfBirth)}</td>
                        <td>
                            <Link className='btn bg-info btn-secondary' to={`${this.props.url}/patient/details/${patient.id}`}>
                                <span className='fa fa-info-circle fa-lg'></span>
                            </Link>
                        </td>
                    </tr>
                );
            });
            return(
                <>
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>

                </>
            );
        }
    }

    render() {
        const table = this.formTable();

        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>All Patients</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 table-div'>
                        {table}
                    </div>
                </div>
                <Row className='mb-5'>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='form-name' sm={3}>Search Name:</Label>
                                <Col sm={6}>
                                    <Input name='name' type='text'
                                        id='form-name' placeholder='Name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Button type='submit' className='btn-dark'>
                                        <span className='fa fa-search'></span>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <div className='row'>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/patient/new`}>
                            Add New
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AllPatients);