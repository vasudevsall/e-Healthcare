import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Collapse, Card, CardBody, CardHeader, Table} from 'reactstrap';
import DocService from "../../../services/DocService";

class DoctorDetails extends Component {

    constructor(props) {
        super(props);
        this.state ={
            details: [],
            detailsAvailable: false,
            errMess: '',
            toggle: 1
        }
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

    setToggle(num) {
        this.setState({
            toggle: num
        });
    }

    componentDidMount() {
        this.toUnmount = false;
        DocService.getDoctorDetails()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        details: resp.data,
                        detailsAvailable: true
                    });
                }
            }).catch((err) => {
            if(!this.toUnmount) {
                this.setState({
                    errMess: 'Error while fetching user details, please try again'
                });
            }
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
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            return(
                <Table bordered size="sm" responsive>
                    <tbody>
                    <tr>
                        <th>User ID:</th>
                        <td>{this.state.details.doctor.id}</td>
                    </tr>
                    <tr>
                        <th>Name:</th>
                        <td>{"Dr. " + this.state.details.doctor.firstName + " " + this.state.details.doctor.lastName}</td>
                    </tr>
                    <tr>
                        <th>Username:</th>
                        <td>{this.state.details.doctor.username}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>{this.printGender(this.state.details.doctor.gender)}</td>
                    </tr>
                    <tr>
                        <th>Date Of Birth:</th>
                        <td>{this.state.details.doctor.dateOfBirth}</td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>{this.state.details.doctor.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Email Id:</th>
                        <td>{this.state.details.doctor.email}</td>
                    </tr>
                    <tr>
                        <th>Blood Group:</th>
                        <td>{this.state.details.doctor.blood}</td>
                    </tr>
                    <tr>
                        <th>Qualification:</th>
                        <td>{this.state.details.doctor.qualification}</td>
                    </tr>
                    <tr>
                        <th>Experience:</th>
                        <td>{this.state.details.doctor.experience} years</td>
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
                        <tr key={appointment.appointmentsModel.serial}>
                            <td>{counter++}</td>
                            <td>{appointment.appointmentsModel.user.firstName + ' ' + appointment.appointmentsModel.user.lastName }</td>
                            <td>{this.formatDate(appointment.appointmentsModel.date)}</td>
                            <td>{this.formatDate(appointment.appointmentsModel.date, false)}</td>
                            <td>{appointment.prescription}</td>
                            <td>{appointment.comments}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Prescription</th>
                                <th>Comments</th>
                            </tr>
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
                        <tr key={appointment.serial}>
                            <td>{counter++}</td>
                            <td>{`${appointment.user.firstName} ${appointment.user.lastName}`}</td>
                            <td>{this.formatDate(appointment.date)}</td>
                            <td>{this.formatDate(appointment.date, false)}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
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
                        <tr key={room.id}>
                            <td>{count++}</td>
                            <td>{room.roomNo.roomNo}</td>
                            <td>{`${room.user.firstName} ${room.user.lastName}`}</td>
                            <td>{room.staff.name}</td>
                            <td>{room.details}</td>
                            <td>{room.checkin}</td>
                            <td>{room.checkout}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Room No:</th>
                                <th>Patient Name:</th>
                                <th>Support Staff:</th>
                                <th>Details</th>
                                <th>Admission</th>
                                <th>Discharge</th>
                            </tr>
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
                        No patient admitted under doctor's care
                    </div>
                );
            }
        }
    }

    bookingIcu() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            if(this.state.details.icu.length > 0) {
                let count = 1;
                const tableBody = this.state.details.icu.map((room) => {
                    return(
                        <tr key={room.id}>
                            <td>{count++}</td>
                            <td>{room.icuNo.icuNo}</td>
                            <td>{`${room.user.firstName} ${room.user.lastName}`}</td>
                            <td>{room.staff.name}</td>
                            <td>{room.details}</td>
                            <td>{room.checkin}</td>
                            <td>{room.checkout}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ICU No:</th>
                                <th>Patient:</th>
                                <th>Support Staff:</th>
                                <th>Details</th>
                                <th>Admission</th>
                                <th>Discharge</th>
                            </tr>
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
                        No patient admitted under doctor's care
                    </div>
                );
            }
        }
    }

    bookingOt() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        } else {
            if(this.state.details.ot.length > 0) {
                let count = 1;
                const tableBody = this.state.details.ot.map((room) => {
                    return(
                        <tr key={room.id}>
                            <td>{count++}</td>
                            <td>{room.otNo.otNo}</td>
                            <td>{`${room.user.firstName} ${room.user.lastName}`}</td>
                            <td>{room.staff.name}</td>
                            <td>{room.details}</td>
                            <td>{room.checkin}</td>
                            <td>{room.checkout}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>OT No:</th>
                                <th>Patient:</th>
                                <th>Support Staff:</th>
                                <th>Details</th>
                                <th>Admission</th>
                                <th>Discharge</th>
                            </tr>
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
                        No Operation history
                    </div>
                );
            }
        }
    }

    render() {
        const formDetails = this.personalTable();
        const appointmentHistory = this.appointmentHistory();
        const upcomingApp = this.upcomingAppointments();
        const roomBookings = this.bookingRoom();
        const icuAdmissions = this.bookingIcu();
        const otAdmissions = this.bookingOt();

        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Doctor Details</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row details-divs'>
                    <div className='col-12'>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DoctorDetails);