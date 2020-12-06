import React, {Component} from 'react';
import UserService from '../../../services/UserService';
import StaffService from '../../../services/StaffService';
import {withRouter} from 'react-router-dom';
import {Table, Form, FormGroup, Input, Label, Col, Button, Row,
     Modal, ModalHeader, ModalBody, Container, Alert, UncontrolledTooltip} from 'reactstrap';
import {Link} from 'react-router-dom';

class AllStaff extends Component {

    constructor(props) {
        super(props)
        this.state ={
            staff: [],
            allStaff: [],
            staffAvailable: false,
            errMess: '',
            name: '',
            doFilter: false,
            isModalOpen: false,
            selectedId: 0,
            isFormModalOpen: false,
            task: '',
            date: '',
            time: '',
            scheduleId: 0,
            isAlertOpen: false,
            isFailedAlertOpen: false
        }
        this.formTable = this.formTable.bind(this);
        this.printGender = this.printGender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleFormModal = this.toggleFormModal.bind(this);
        this.handleScheduleSubmit = this.handleScheduleSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        StaffService.getAllStaff()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        staff: resp.data,
                        allStaff: resp.data,
                        staffAvailable: true
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

        let staffMember;
        let filterStaff = [];
        for(staffMember of this.state.allStaff) {
            let name = staffMember.name;
            name = name.toLowerCase();
            let search = this.state.name.toLowerCase();
            if(name.includes(search)) {
                filterStaff.push(staffMember);
            }
        }

        
        this.setState({
            staff: filterStaff
        })
    }

    formTable() {
        if(!this.state.staffAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            const tableBody = this.state.staff.map((staffMember) => {
                return(
                        <tr key={staffMember.id}>
                            <td>{staffMember.id}</td>
                            <td>{staffMember.name}</td>
                            <td>{staffMember.phoneNumber}</td>
                            <td>{this.printGender(staffMember.gender)}</td>
                            <td>{staffMember.birth}</td>
                            <td>{staffMember.joined}</td>
                            <td>
                                <Link id='staff-info' 
                                    className='btn btn-secondary mx-1 bg-info' 
                                    to={`${this.props.url}/staff/details/${staffMember.id}`}
                                >
                                    <span className='fa fa-info-circle fa-lg'></span>
                                </Link>
                                <button id='delete-staff'
                                    onClick={() => this.openModal(staffMember.id, 1)} 
                                    className='btn btn-dark bg-danger mx-1'
                                >
                                    <span className='fa fa-trash fa-lg'></span>
                                </button>
                                <button id='schedule-task'
                                    onClick={() => this.openModal(staffMember.id, 2)} 
                                    className='btn btn-dark bg-secondary mx-1'
                                >
                                    <span className='fa fa-calendar-check-o fa-lg'></span>
                                </button>
                                <UncontrolledTooltip placement='top' target='staff-info'>
                                    Get Details
                                </UncontrolledTooltip>
                                <UncontrolledTooltip placement='top' target='delete-staff'>
                                    Delete Staff Member
                                </UncontrolledTooltip>
                                <UncontrolledTooltip placement='top' target='schedule-task'>
                                    Schedule Task
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                );
            });
            return(
                <>
                    <Table hover bordered responsive striped size="sm">
                        <thead>
                            <tr>
                                <th>Employee Id</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Date Joined</th>
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

    openModal(id, choice) {
        if(choice === 1) {
            this.setState({
                selectedId: id,
                isModalOpen: true
            });
        } else if(choice === 2) {
            this.setState({
                scheduleId: id,
                isFormModalOpen: true
            });
        }
    }

    deleteUser() {
        StaffService.deleteStaff(this.state.selectedId)
        .then((resp) => {
            StaffService.getAllStaff()
            .then((resp) => {
                this.setState({
                    staff: resp.data,
                    AllStaff: resp.data,
                    staffAvailable: true,
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

    toggleFormModal() {
        this.setState({
            isFormModalOpen: !this.state.isFormModalOpen
        })
    }

    handleScheduleSubmit(event) {
        event.preventDefault();
        let time = this.state.date+'T'+this.state.time+':00.000';
        StaffService.scheduleATask(this.state.scheduleId, this.state.task, time)
        .then((resp) => {
            this.setState({
                isAlertOpen: true,
                task: '',
                date: '',
                time: '',
                isFormModalOpen: false
            })
        }).catch((err) => {
            this.setState({
                isFailedAlertOpen: true,
                task: '',
                date: '',
                time: '',
                isFormModalOpen: false
            })
        })
    }

    toggleAlert() {
        this.setState({
            isAlertOpen: false,
            isFailedAlertOpen: false
        })
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
                <Modal isOpen={this.state.isFormModalOpen} toggle={this.toggleFormModal}>
                    <ModalHeader toggle={this.toggleFormModal}>Schedule Task</ModalHeader>
                    <ModalBody>
                        <Container fluid>
                            <Form onSubmit={this.handleScheduleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor='form-task' sm={2}>Task:</Label>
                                    <Col sm={10}>
                                        <Input
                                            type='textarea' value={this.state.task} onChange={this.handleChange}
                                            name='task' id='form-task' placeholder='Enter Task Here' required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='form-date' sm={2}>Date:</Label>
                                    <Col sm={10}>
                                        <Input
                                            type='date' value={this.state.date} onChange={this.handleChange}
                                            name='date' id='form-date' placeholder='Enter Date' required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='form-time' sm={2}>Time:</Label>
                                    <Col sm={10}>
                                        <Input
                                            type='time' value={this.state.time} onChange={this.handleChange}
                                            name='time' id='form-time' placeholder='Enter Time Here' required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col className='offset-sm-2' sm={10}>
                                        <Button type='submit'>
                                            Schedule
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Container>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>All Staff Members</h4>
                        <hr/>
                    </div>
                </div>
                <Alert color='success' isOpen={this.state.isAlertOpen} toggle={this.toggleAlert}>
                    Task scheduled successfully!
                </Alert>
                <Alert color='danger' isOpen={this.state.isFailedAlertOpen} toggle={this.toggleAlert}>
                    Task cannot be scheduled due to an error!
                </Alert>
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
                        <Link className='btn btn-dark' to={`${this.props.url}/staff/new`}>
                            Add New
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AllStaff);