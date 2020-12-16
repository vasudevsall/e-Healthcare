import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Form, FormGroup, Col, Label, Input, Button, Card, CardHeader, Collapse, CardBody, Table} from 'reactstrap';
import DocService from "../../../services/DocService";

class PatientDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPhone: '',
            details: [],
            detailsAvailable: false,
            detailsSearch: false,
            errMess: '',
            toggle: 1,
            notFound: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formDetailsData = this.formDetailsData.bind(this);
        this.setToggle = this.setToggle.bind(this);
        this.personalTable = this.personalTable.bind(this);
        this.printGender = this.printGender.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.appointmentHistory = this.appointmentHistory.bind(this);
        this.upcomingAppointments = this.upcomingAppointments.bind(this);
        this.bookingRoom = this.bookingRoom.bind(this);
        this.bookingIcu = this.bookingIcu.bind(this);
        this.bookingOt = this.bookingOt.bind(this);
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
        DocService.getPatientDetails(this.state.formPhone)
            .then((resp) => {
                this.setState({
                    details: resp.data,
                    detailsAvailable: true,
                    detailsSearch: true,
                    notFound: false
                })
            }).catch((err) => {
                this.setState({
                    notFound: true
                })
        })
    }

    setToggle(num) {
        this.setState({
            toggle: num
        });
    }

    printGender(gend) {
        if(gend === 'M') {
            return "Male";
        } else if(gend === 'F') {
            return "Female";
        }
        return "Other";
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

    personalTable() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            return(
                <Table bordered size="sm" responsive>
                    <tbody>
                    <tr>
                        <th>User ID:</th>
                        <td>{this.state.details.details.id}</td>
                    </tr>
                    <tr>
                        <th>Name:</th>
                        <td>{this.state.details.details.firstName + " " + this.state.details.details.lastName}</td>
                    </tr>
                    <tr>
                        <th>Username:</th>
                        <td>{this.state.details.details.username}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>{this.printGender(this.state.details.details.gender)}</td>
                    </tr>
                    <tr>
                        <th>Date Of Birth:</th>
                        <td>{this.formatDate(this.state.details.details.dateOfBirth)}</td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>{this.state.details.details.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Email Id:</th>
                        <td>{this.state.details.details.email}</td>
                    </tr>
                    <tr>
                        <th>Blood Group:</th>
                        <td>{this.state.details.details.blood}</td>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    appointmentHistory() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            if(this.state.details.appointments.length > 0) {
                let counter = 1;
                const tableBody = this.state.details.appointments.map((appointment) => {
                    return(
                        <>
                            <tr key={appointment.appointmentsModel.serial}>
                                <td>{counter++}</td>
                                <td>{`Dr. ${appointment.appointmentsModel.doctor.firstName} ${appointment.appointmentsModel.doctor.lastName}`}</td>
                                <td>{this.formatDate(appointment.appointmentsModel.date)}</td>
                                <td>{this.formatDate(appointment.appointmentsModel.date, false)}</td>
                                <td>{appointment.prescription}</td>
                                <td>{appointment.comments}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>#</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Prescription</th>
                            <th>Comments</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        No appointment History
                    </div>
                );
            }
        }
    }

    upcomingAppointments() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.upcoming.length > 0) {
                let counter = 1;
                const tableBody = this.state.details.upcoming.map((appointment) => {
                    return(
                        <>
                            <tr key={appointment.serial}>
                                <td>{counter++}</td>
                                <td>{`Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                <td>{this.formatDate(appointment.date)}</td>
                                <td>{this.formatDate(appointment.date, false)}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>#</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        No appointments scheduled
                    </div>
                );
            }
        }
    }

    pharmacyOrders() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.orders.length > 0) {
                const tableBody = this.state.details.orders.map((order) => {
                    return(
                        <>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.medId.medId.name}</td>
                                <td>{order.medId.medId.manufacturer}</td>
                                <td>{order.date}</td>
                                <td>{order.medId.expiry}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.delivered? "Yes" : "No"}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>Order Id</th>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Date</th>
                            <th>Expire</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>delivered</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        No orders placed
                    </div>
                );
            }
        }
    }

    bookingRoom() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.room.length > 0) {
                let count = 1;
                const tableBody = this.state.details.room.map((room) => {
                    return(
                        <>
                            <tr key={room.id}>
                                <td>{count++}</td>
                                <td>{room.roomNo.roomNo}</td>
                                <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
                                <td>{room.staff.name}</td>
                                <td>{room.details}</td>
                                <td>{room.checkin}</td>
                                <td>{room.checkout}</td>
                                <td className={room.paid ? 'text-success' : 'text-danger'}>{room.cost}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>#</th>
                            <th>Room No:</th>
                            <th>Doctor:</th>
                            <th>Support Staff:</th>
                            <th>Details</th>
                            <th>Admission</th>
                            <th>Discharge</th>
                            <th>Bill</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        Never Admitted
                    </div>
                );
            }
        }
    }

    bookingIcu() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.icu.length > 0) {
                let count = 1;
                const tableBody = this.state.details.icu.map((room) => {
                    return(
                        <>
                            <tr key={room.id}>
                                <td>{count++}</td>
                                <td>{room.icuNo.icuNo}</td>
                                <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
                                <td>{room.staff.name}</td>
                                <td>{room.details}</td>
                                <td>{room.checkin}</td>
                                <td>{room.checkout}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>#</th>
                            <th>ICU No:</th>
                            <th>Doctor:</th>
                            <th>Support Staff:</th>
                            <th>Details</th>
                            <th>Admission</th>
                            <th>Discharge</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        Never admitted to an ICU
                    </div>
                );
            }
        }
    }

    bookingOt() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.ot.length > 0) {
                let count = 1;
                const tableBody = this.state.details.ot.map((room) => {
                    return(
                        <>
                            <tr key={room.id}>
                                <td>{count++}</td>
                                <td>{room.otNo.otNo}</td>
                                <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
                                <td>{room.staff.name}</td>
                                <td>{room.details}</td>
                                <td>{room.checkin}</td>
                                <td>{room.checkout}</td>
                            </tr>
                        </>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <th>#</th>
                            <th>OT No:</th>
                            <th>Doctor:</th>
                            <th>Support Staff:</th>
                            <th>Details</th>
                            <th>Admission</th>
                            <th>Discharge</th>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </div>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        Never admitted to an Operation Theatre
                    </div>
                );
            }
        }
    }

    formDetailsData() {
        if(this.state.notFound) {
            return(
                <div className={'table-div d-flex align-items-center justify-content-center'}>
                    <label className={'font-weight-bold'}>
                        User Details not found. Please check the input phone number and try again.
                    </label>
                </div>
            )
        }
        if(!this.state.detailsSearch) {
            return (<></>);
        }
        if(this.state.detailsSearch && !this.state.detailsAvailable) {
            return (
                <div className='full-flex-span'>
                    <span className='fa fa-spin fa-circle-o-notch fa-lg'/>
                </div>
            );
        }
        const formDetails = this.personalTable();
        const appointmentHistory = this.appointmentHistory();
        const upcomingApp = this.upcomingAppointments();
        const pharmOrders = this.pharmacyOrders();
        const roomBookings = this.bookingRoom();
        const icuAdmissions = this.bookingIcu();
        const otAdmissions = this.bookingOt();
        return (
            <>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 1 ? this.setToggle(0) : this.setToggle(1)}}>
                        Personal Details
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 1}>
                        <CardBody>
                            {formDetails}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 2 ? this.setToggle(0) : this.setToggle(2)}}>
                        Appointment History
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 2}>
                        <CardBody>
                            {appointmentHistory}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 3 ? this.setToggle(0) : this.setToggle(3)}}>
                        Upcoming Appointments
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 3}>
                        <CardBody>
                            {upcomingApp}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 4 ? this.setToggle(0) : this.setToggle(4)}}>
                        Pharmacy Orders
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 4}>
                        <CardBody>
                            {pharmOrders}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 5 ? this.setToggle(0) : this.setToggle(5)}}>
                        Hospital Admissions
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 5}>
                        <CardBody>
                            {roomBookings}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 6 ? this.setToggle(0) : this.setToggle(6)}}>
                        ICU Admissions
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 6}>
                        <CardBody>
                            {icuAdmissions}
                        </CardBody>
                    </Collapse>
                </Card>
                <Card>
                    <CardHeader onClick={() => {this.state.toggle === 7 ? this.setToggle(0) : this.setToggle(7)}}>
                        Operation Theatre Admissions
                    </CardHeader>
                    <Collapse isOpen={this.state.toggle === 7}>
                        <CardBody>
                            {otAdmissions}
                        </CardBody>
                    </Collapse>
                </Card>
            </>
        );
    }

    render() {
        const details = this.formDetailsData();
        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Search Patient Details</h4>
                        <hr/>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={5}>Patient Phone Number</Label>
                        <Col className={'my-2 my-sm-0'} sm={4}>
                            <Input
                                type={'text'}
                                value={this.state.formPhone}
                                name='formPhone' onChange={this.handleChange}
                                placeholder='Phone Number' required
                            />
                        </Col>
                        <Col sm={1}>
                            <Button type={'submit'}>
                                <span className={'fa fa-search fa-lg'}/>
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className='row mb-2 details-divs'>
                    <div className='col-12'>
                        {details}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PatientDetails);