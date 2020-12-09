import React, {Component} from 'react';
import AccomodationService from '../../../services/AccomodationService';
import {withRouter, Link} from 'react-router-dom';
import {Table, UncontrolledTooltip, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Input, Col} from 'reactstrap';

class CurrentOt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            allRooms: [],
            roomsAvailable: false,
            errMess: '',
            selectedId: 0,
            isModalOpen: false,
            name: '',
            admit: ''
        }

        this.formTable = this.formTable.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateFocus = this.dateFocus.bind(this);
        this.dateBlur = this.dateBlur.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.icuDischarge = this.icuDischarge.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AccomodationService.getOtCurrent()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    rooms: resp.data,
                    allRooms: resp.data,
                    roomsAvailable: true
                })
            }
        }).catch((err) => {
            if(!this.toUnmount) {
                this.setState({
                    errMess: 'Error fetching current admission details'
                })
            }
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    openModal(id) {
        this.setState({
            selectedId: id,
            isModalOpen: true
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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

        let room;
        let filterRooms = [];
        for(room of this.state.allRooms) {
            let name = room.user.firstName + ' ' + room.user.lastName;
            name = name.toLowerCase();
            let search = this.state.name.toLowerCase();
            if(name.includes(search) && room.checkin.includes(this.state.admit)) {
                filterRooms.push(room);
            }
        }

        this.setState({
            rooms: filterRooms
        });
    }

    dateFocus(event) {
        event.currentTarget.type = 'date';
    }
    dateBlur(event) {
        event.currentTarget.type = 'text';
        let name = event.target.name;
        event.currentTarget.placeholder = name.charAt(0).toUpperCase() + name.slice(1);
    }

    clearForm() {
        this.setState({
            name: '',
            admit: '',
            discharge: '',
            rooms: this.state.allRooms
        });
    }

    formTable() {
        if(!this.state.roomsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.rooms.length === 0) {
                if(this.state.allRooms.length === 0) {
                    return (
                        <div className='full-flex-span'>
                            <label>No Patient admitted</label>
                        </div>
                    );
                }
                return(
                    <div className='full-flex-span'>
                        <label>No record matching current filters</label>
                    </div>
                );
            } else {

                const tableBody = this.state.rooms.map((room) => {
                    return(
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.otNo.otNo}</td>
                            <td>{room.user.firstName + ' ' + room.user.lastName}</td>
                            <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
                            <td>{room.staff.name}</td>
                            <td>{room.details}</td>
                            <td>{room.checkin}</td>
                            <td>
                                <button onClick={() => this.openModal(room.id)}
                                    className='btn btn-outline-success btn-sm'
                                    id={`patient-discharge-${room.id}`}
                                >
                                    <span className='fa fa-sign-out fa-lg'></span>
                                </button>
                                <UncontrolledTooltip target={`patient-discharge-${room.id}`} placement='right'>
                                    Discharge
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
                                    <th>Id</th>
                                    <th>Room No</th>
                                    <th>Patient Name</th>
                                    <th>Doctor Name</th>
                                    <th>Support Staff</th>
                                    <th>Details</th>
                                    <th>Admit</th>
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
    }

    icuDischarge(event) {
        event.preventDefault();
    }

    render() {
        const table = this.formTable();
        return(
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are You Sure ?</ModalHeader>
                    <ModalBody>
                        <div className='full-flex-span mt-5'>
                            <Button onClick={this.icuDischarge} className='btn btn-dark bg-danger mx-3'>
                                Discharge
                            </Button>
                            <Button onClick={this.toggleModal} className='bg-success mx-3'>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
                <div className='row mb-5'>
                    <div className='col-12'>
                        <div className='table-div-300'>
                            {table}
                        </div>
                        <hr className='m-0' />
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Input type='text'
                                placeholder='Name'
                                name='name'
                                onChange={this.handleChange}
                                value = {this.state.name}
                            />
                        </Col>
                        <Col sm={3}>
                            <Input type='text'
                                placeholder='Admit'
                                name = 'admit'
                                onFocus={this.dateFocus}
                                onBlur={this.dateBlur}
                                value = {this.state.admit}
                                onChange = {this.handleChange}
                            />
                        </Col>
                        <Col sm={3}>
                            <Button type='submit' className='mr-1'>
                                <span className='fa fa-search fa-lg'></span>
                            </Button>
                            <Button onClick={this.clearForm} className='bg-danger'>
                                <span className='fa fa-times fa-lg'></span>
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className='row'>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/room/history`}>
                            History
                        </Link>
                    </div>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/room/admit`}>
                            Admit Patient
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(CurrentOt);