import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AccomodationService from '../../../services/AccomodationService';
import {Table, Modal, ModalBody, ModalHeader, UncontrolledTooltip, 
    Form, FormGroup, Input, Col, Button, Label, Alert} from 'reactstrap';
import InfoService from '../../../services/InfoService';
import StaffService from '../../../services/StaffService';

class AdmitIcu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            allRooms: [],
            roomsAvailable: false,
            errMess: '',
            roomNo: '',
            beds: '',
            isModalOpen: false,
            selectedRoom: 0,
            modalErr: '',
            allSpeciality: [],
            isAllSpeciality: false,
            specialityDoctors: [],
            staffMembers: [],
            phone: '',
            speciality: '',
            doctor: '',
            staff: '',
            details: '',
            isSuccessAlert: false
        };
        this.formTable = this.formTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAdmitPatient = this.handleAdmitPatient.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        AccomodationService.getAllIcuInfo()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    rooms: resp.data,
                    allRooms: resp.data,
                    errMess: '',
                    roomsAvailable: true,
                    phone: ''
                })
            }
        }).catch((err) => {
            if(!this.toUnmount) {
                this.setState({
                    errMess: 'Unable to fetch icu details'
                })
            }
        });

        InfoService.getAllSpeciality()
        .then((resp) => {
            if(!this.toUnmout) {
                this.setState({
                    allSpeciality: resp.data,
                    ifAllSpeciality: true
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

        StaffService.getAllStaff()
        .then((resp) => {
            if(!this.toUnmount) {
                this.setState({
                    staffMembers: resp.data
                })
            }
        }).catch((err) => {
            if(!this.toUnmount) {
                this.setState({
                    errMess: 'An error occured while fetching staff details'
                })
            }
        });
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
        });

        if(name === 'speciality') {
            InfoService.getSpecialistDoctors(value)
                .then((resp) => {
                    this.setState({
                        specialityDoctors: resp.data
                    })
                })
                .catch((err) => {
                    this.setState({
                        errMess: 'An error occured'
                    })
                });
        }
    }

    openModal(roomNo) {
        this.setState({
            selectedRoom: roomNo,
            isModalOpen: true
        })
    }

    clearForm() {
        this.setState({
            roomNo: '',
            beds: '',
            rooms: this.state.allRooms
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let room;
        let filterRooms = [];
        for(room of this.state.allRooms) {
            let roomNo = '' + room.roomNo;
            let beds = '' + room.max;
            if(roomNo.includes(this.state.roomNo) && beds.includes(this.state.beds)) {
                filterRooms.push(room);
            }
        }

        this.setState({
            rooms: filterRooms
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleAlert() {
        this.setState({
            isSuccessAlert: !this.state.isSuccessAlert
        })
    }

    handleAdmitPatient(event) {
        event.preventDefault();
        let staffId = this.state.staff.split(' - ');
        staffId = parseInt(staffId[0], 10);

        AccomodationService.admitIcu(this.state.selectedRoom, this.state.phone, this.state.details,
            this.state.doctor, staffId
        ).then((resp) => {
            AccomodationService.getAllIcuInfo()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        rooms: resp.data,
                        allRooms: resp.data,
                        errMess: '',
                        roomsAvailable: true,
                        phone: '',
                        staff: '',
                        selectedRoom: 0,
                        details: '',
                        doctor: 0,
                        isModalOpen: false,
                        isSuccessAlert: true

                    })
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Unable to fetch rooms details'
                    })
                }
            });
        }).catch((err) => {
            this.setState({
                modalErr: err.response.data
            })
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
            if(!this.state.rooms.length === 0) {
                if(this.state.allRooms.length === 0) {
                    return (
                        <div className='full-flex-span'>
                            <label>No Rooms</label>
                        </div>
                    );
                }
                return(
                    <div className='full-flex-span'>
                        <label>No record matching current filters</label>
                    </div>
                );
            }

            const tableBody = this.state.rooms.map((room) => {
                return(
                    <tr key={room.icuNo}>
                        <td>{room.icuNo}</td>
                        <td>{room.floor}</td>
                        <td>{(room.vacant)? "Vacant" : "Occupied"}</td>
                        <td>
                            <button className='btn btn-outline-danger btn-sm' 
                                id={`icu-patient-${room.icuNo}`}
                                onClick={() => this.openModal(room.icuNo)}
                                disabled = {!room.vacant}
                            >
                                <span className='fa fa-plus-square'></span>
                            </button>
                            <UncontrolledTooltip target={`icu-patient-${room.icuNo}`} placement='right'>
                                Admit Patient
                            </UncontrolledTooltip>
                        </td>
                    </tr>
                );
            })

            return(
                <Table responsive size='sm' bordered striped hover>
                    <thead>
                        <tr>
                            <th>ICU No.</th>
                            <th>Floor</th>
                            <th>State</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
            );
        }
    }

    render() {
        const table = this.formTable();
        const speciality = this.state.allSpeciality.map((speciality)=> {
            return(
                <option key={speciality.specialityName}>{speciality.specialityName}</option>
            );
        });
        const docSpeciality = this.state.specialityDoctors.map((doc) => {
            return(
                <option key={doc.doctor.id} value={doc.doctor.id}>{`Dr. ${doc.doctor.firstName} ${doc.doctor.lastName}`}</option>
            );
        });
        const staffData = this.state.staffMembers.map((staff) => {
            return(
                <option key={staff.id}>{`${staff.id} - ${staff.name}`}</option>
            );
        })
        return(
            <>
                <Modal isOpen={this.state.isModalOpen} centered={true} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Enter Patient Details</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row mb-2'>
                                <div className='col-12'>
                                    <label className='text-danger'>{this.state.modalErr}</label>
                                </div>
                            </div>
                            <Form onSubmit={this.handleAdmitPatient}>
                                <FormGroup row>
                                    <Label htmlFor='form-room' sm={4}>ICU Number:</Label>
                                    <Col sm={7}>
                                        <Input type='text'
                                            id = 'form-room'
                                            placeholder='Room Number'
                                            name = 'selectedRoom'
                                            onChange = {this.handleChange}
                                            value = {this.state.selectedRoom}
                                            disabled
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='form-phone' sm={4}>Patient Phone:</Label>
                                    <Col sm={7}>
                                        <Input type='text'
                                            id = 'form-phone'
                                            placeholder='Phone Number'
                                            name = 'phone'
                                            onChange = {this.handleChange}
                                            value = {this.state.phone}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='form-details' sm={4}>Details:</Label>
                                    <Col sm={7}>
                                        <Input type='textarea'
                                            id = 'form-details'
                                            placeholder='Details'
                                            name = 'details'
                                            onChange = {this.handleChange}
                                            value = {this.state.details}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4} htmlFor='form-speciality'>Select Speciality:</Label>
                                    <Col sm={7}>
                                        <Input type='select' value={this.state.speciality}
                                            name='speciality' id='form-speciality' placeholder='Select One'
                                            onChange = {this.handleChange}
                                        >
                                            <option selected disabled hidden value=''>Select One</option>
                                            {speciality}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4} htmlFor='form-doctor'>Select Doctor:</Label>
                                    <Col sm={7}>
                                        <Input type='select' value={this.state.doctor}
                                            name='doctor' id='form-doctor' placeholder='Select One'
                                            onChange = {this.handleChange}
                                        >
                                            <option selected disabled hidden value=''>Select One</option>
                                            {docSpeciality}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4} htmlFor='form-staff'>Select Staff:</Label>
                                    <Col sm={7}>
                                        <Input type='text' value={this.state.staff}
                                            name='staff' id='form-staff' placeholder='Select One (id - Name)'
                                            onChange = {this.handleChange} list='staff'
                                        />
                                        <datalist id='staff'>
                                            <option selected disabled hidden value=''>Select One</option>
                                            {staffData}
                                        </datalist>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col className='offset-sm-4' sm={7}>
                                        <Button type='submit'>
                                            Admit Patient
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h6>Select ICU:</h6>
                    </div>
                </div>
                <Alert color='success' isOpen={this.state.isSuccessAlert} toggle={this.toggleAlert}>
                    Patient Admitted successfully
                </Alert>
                <div className='row mb-4'>
                    <div className='col-12 col-lg-10'>
                        <div className='table-div-300 wrap'>
                            {table}
                        </div>
                        <hr className='m-0' />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-12'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col className='my-2' sm={3}>
                                    <Input type='number' placeholder='Room Number'
                                        name='roomNo' value={this.state.roomNo}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col className='my-2' sm={3}>
                                    <Input type='number' placeholder='Total Beds'
                                        name='beds' value={this.state.beds}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col className='my-2' sm={3}>
                                    <Button className='mx-1' type='submit'>
                                        <span className='fa fa-search fa-lg'></span>
                                    </Button>
                                    <Button onClick={this.clearForm} className='bg-danger'>
                                        <span className='fa fa-times fa-lg'></span>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(AdmitIcu);