import React, {Component} from 'react';
import InfoService from '../../../services/InfoService';
import UserService from '../../../services/UserService';
import PatientService from '../../../services/PatientService';
import {withRouter} from 'react-router-dom';
import {Table, Form, FormGroup, Input, Label, Col, Button, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';

class AllDoctors extends Component {

    constructor(props) {
        super(props)
        this.state ={
            doctors: [],
            allDoctors: [],
            doctorsAvaiable: false,
            errMess: '',
            name: '',
            doFilter: false,
            isModalOpen: false,
            selectedId: 0
        }
        this.formTable = this.formTable.bind(this);
        this.printGender = this.printGender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        InfoService.getAllDoctors()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        doctors: resp.data,
                        allDoctors: resp.data,
                        doctorsAvaiable: true
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

        let doctor;
        let filterDoctors = [];
        for(doctor of this.state.allDoctors) {
            let name = doctor.firstName + ' ' +  doctor.lastName;
            name = name.toLowerCase();
            let search = this.state.name.toLowerCase();
            if(name.includes(search)) {
                filterDoctors.push(doctor);
            }
        }

        
        this.setState({
            doctors: filterDoctors
        })
    }

    formTable() {
        if(!this.state.doctorsAvaiable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            let counter = 1;
            const tableBody = this.state.doctors.map((doctor) => {
                return(
                        <tr key={doctor.id}>
                            <td>{counter++}</td>
                            <td>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</td>
                            <td>{doctor.username}</td>
                            <td>{doctor.phoneNumber}</td>
                            <td>{this.printGender(doctor.gender)}</td>
                            <td>{doctor.dateOfBirth}</td>
                            <td>{doctor.speciality[0]}</td>
                            <td>
                                <Link className='btn btn-secondary bg-info mx-1' to={`${this.props.url}/doctor/details/${doctor.id}`}>
                                    <span className='fa fa-info-circle fa-lg'></span>
                                </Link>
                                <button onClick={() => this.openModal(doctor.id)} className='btn btn-dark bg-danger mx-1'>
                                    <span className='fa fa-trash fa-lg'></span>
                                </button>
                            </td>
                        </tr>
                );
            });
            return(
                <>
                    <Table hover bordered responsive striped size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Speciality</th>
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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    openModal(id) {
        this.setState({
            selectedId: id,
            isModalOpen: true
        });
    }

    deleteUser() {
        PatientService.deleteUser(this.state.selectedId)
        .then((resp) => {
            InfoService.getAllDoctors()
            .then((resp) => {
                this.setState({
                    doctors: resp.data,
                    allDoctors: resp.data,
                    doctorsAvaiable: true,
                    isModalOpen: false
                });
            }).catch((err) => {
                this.setState({
                    errMess: 'Cannot fetch Details'
                })
            })  
        }).catch((err) => {
            this.setState({
                errMess: 'User cannot be deleted'
            });
        });
    }

    render() {
        const table = this.formTable();

        return(
            <div className='fluid-container'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are you sure ?</ModalHeader>
                    <ModalBody>
                        <div className='full-flex-span mt-5'>
                            <Button onClick={this.deleteUser} className='bg-danger mx-3'>Delete</Button>
                            <Button onClick={this.toggleModal} className='bg-success mx-3'>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>All Doctors</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-12 table-div'>
                        {table}
                    </div>
                </div>
                <Row className='mb-3'>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='form-name' sm={3}>Search Name:</Label>
                                <Col sm={6}>
                                    <Input name='name' type='text'
                                        id='form-name' placeholder='Name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
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
                        <Link className='btn btn-dark' to={`${this.props.url}/doctor/new`}>
                            Add New
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AllDoctors);