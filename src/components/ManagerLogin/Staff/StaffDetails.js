import React, {Component} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import {Collapse, Card, CardBody, CardHeader, Table} from 'reactstrap';
import StaffService from '../../../services/StaffService';

class Details extends Component {

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
        this.appointmentHistory = this.taskHistory.bind(this);
        this.upcomingAppointments = this.upcomingTasks.bind(this);
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
        StaffService.getCompleteStaffDetails(this.props.userId)
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
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            return(
                <Table bordered size="sm" responsive>
                    <tbody>
                        <tr>
                            <th>Staff ID:</th>
                            <td>{this.state.details.staff.id}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>{this.state.details.staff.name}</td>
                        </tr>
                        <tr>
                            <th>Gender:</th>
                            <td>{this.printGender(this.state.details.staff.gender)}</td>
                        </tr>
                        <tr>
                            <th>Date Of Birth:</th>
                            <td>{this.state.details.staff.birth}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>{this.state.details.staff.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Qualification:</th>
                            <td>{this.state.details.staff.qualification}</td>
                        </tr>
                    </tbody>
                </Table>
            );
        }
    }

    taskHistory() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.past.length > 0) {
                let counter = 1;
                const tableBody = this.state.details.past.map((task) => {
                    return(
                        <tr key={task.id}>
                            <td>{counter++}</td>
                            <td>{task.manager.firstName + " " + task.manager.lastName}</td>
                            <td>{this.formatDate(task.scheduledAt) + "   " + this.formatDate(task.scheduledAt, false)}</td>
                            <td>{task.task}</td>
                            <td>{this.formatDate(task.scheduledFor) + "   " + this.formatDate(task.scheduledFor, false)}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assigned By</th>
                                    <th>Assigned At</th>
                                    <th>Task</th>
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
                        No tasks assigned yet
                    </div>
                );
            }
        }
    }

    upcomingTasks() {
        if(!this.state.detailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.details.upcoming.length > 0) {
                let counter = 1;
                const tableBody = this.state.details.upcoming.map((task) => {
                    return(
                        <tr key={task.id}>
                            <td>{counter++}</td>
                            <td>{task.manager.firstName + " " + task.manager.lastName}</td>
                            <td>{this.formatDate(task.scheduledAt) + "   " + this.formatDate(task.scheduledAt, false)}</td>
                            <td>{task.task}</td>
                            <td>{this.formatDate(task.scheduledFor) + "   " + this.formatDate(task.scheduledFor, false)}</td>
                        </tr>
                    );
                });
                return(
                    <div className='details-table-div'>
                        <Table bordered size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assigned By</th>
                                    <th>Assigned At</th>
                                    <th>Task</th>
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
                        No future tasks assigned
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
                            <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
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
                                    <th>Doctor:</th>
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
                        No room assigned yet
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
                        <tr key={room.id}>
                            <td>{count++}</td>
                            <td>{room.icuNo.icuNo}</td>
                            <td>{`${room.user.firstName} ${room.user.lastName}`}</td>
                            <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
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
                                    <th>ICU No</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
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
                        Not assigned to any ICU
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
                        <tr key={room.id}>
                            <td>{count++}</td>
                            <td>{room.otNo.otNo}</td>
                            <td>{`${room.user.firstName} ${room.user.lastName}`}</td>
                            <td>{`Dr. ${room.doctor.firstName} ${room.doctor.lastName}`}</td>
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
                                    <th>OT No</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
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
                        Not assigned to any Operation Theatre
                    </div>
                );
            }
        }
    }

    render() {
        const formDetails = this.personalTable();
        const taskHistory = this.taskHistory();
        const upcomingTasks = this.upcomingTasks();
        const roomBookings = this.bookingRoom();
        const icuAdmissions = this.bookingIcu();
        const otAdmissions = this.bookingOt();

        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Patient Details</h4>
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
                                Task History
                            </CardHeader>
                            <Collapse isOpen={this.state.toggle === 2}>
                                <CardBody>
                                    {taskHistory}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card>
                            <CardHeader onClick={() => {this.state.toggle === 3 ? this.setToggle(0) : this.setToggle(3)}}>
                                Tasks Scheduled
                            </CardHeader>
                            <Collapse isOpen={this.state.toggle === 3}>
                                <CardBody>
                                    {upcomingTasks}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card>
                            <CardHeader onClick={() => {this.state.toggle === 5 ? this.setToggle(0) : this.setToggle(5)}}>
                                Rooms Assigned
                            </CardHeader>
                            <Collapse isOpen={this.state.toggle === 5}>
                                <CardBody>
                                    {roomBookings}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card>
                            <CardHeader onClick={() => {this.state.toggle === 6 ? this.setToggle(0) : this.setToggle(6)}}>
                                ICUs Assigned
                            </CardHeader>
                            <Collapse isOpen={this.state.toggle === 6}>
                                <CardBody>
                                    {icuAdmissions}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card>
                            <CardHeader onClick={() => {this.state.toggle === 7 ? this.setToggle(0) : this.setToggle(7)}}>
                                Operation Theatres Assigned
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

function StaffDetails(props) {
    let { userId } = useParams();

    return(
        <Details userId={userId} history={props.history} url={props.url} />
    );
}

export default withRouter(StaffDetails);