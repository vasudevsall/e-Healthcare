import React, {Component} from 'react';
import DocService from '../../services/DocService';
import {withRouter} from "react-router-dom";
import {Table} from "reactstrap";

class DoctorContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcoming: [],
            upcomingAvailable: false,
            errMess: ''
        }
        this.renderScheduleFunction = this.renderScheduleFunction.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        DocService.getUpcomingAppointments()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        upcoming: resp.data,
                        upcomingAvailable: true,
                        errMess:''
                    });
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Unable to fetch Upcoming Appointments'
                    })
                }
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

    renderScheduleFunction() {
        if(!this.state.upcomingAvailable) {
            return (<div className = 'full-flex-span'>
                <span className = 'fa fa-spin fa-circle-o-notch'/>
            </div>);
        }
        else {
            let count = 1;
            const tableData = this.state.upcoming.map((appointment) => {
                return(
                    <tr key = {appointment.serial}>
                        <td>{count++}</td>
                        <td>{
                            appointment.user.firstName + "  "
                            + appointment.user.lastName
                        }</td>
                        <td>{this.formatDate(appointment.date)}</td>
                        <td>{this.formatDate(appointment.date, false)}</td>
                    </tr>
                );
            });
            if(this.state.upcoming.length > 0) {
                return(
                    <Table size={'sm'}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData}
                        </tbody>
                    </Table>
                );
            } else {
                return (
                    <div className = 'full-flex-span'>
                        <span>No scheduled appointments</span>
                    </div>
                )
            }
        }
    }

    render() {
        const renderSchedule = this.renderScheduleFunction();
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Dashboard</h4>
                        <hr/>
                    </div>
                </div>

                <div className='row'>
                    <div className= 'col-lg-8 col-12'>
                        <div className = 'dash-card'>
                            <div className = 'head'>
                                Upcoming Appointments
                            </div>
                            <div className = 'body'>
                                {renderSchedule}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DoctorContent);