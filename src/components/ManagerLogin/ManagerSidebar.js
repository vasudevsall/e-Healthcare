import React, {useState} from 'react';
import {Collapse, Card, CardBody, CardHeader} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

function ManagerSideBar(props) {

    const [toggle, setToggle] = useState(0);
    return(
        <div id="sidebar" className='is-active'>
            <div className='container'>
                <h5 className='mb-3'>Welcome {props.userInfo.username}!</h5>
            </div>

            <Card>
                <CardHeader onClick={() => {props.history.push("/manager")}}>
                    <span className='font-weight-bold'>Dashboard</span>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === -1 ? setToggle(0) : setToggle(-1)}}>
                    <span className='font-weight-bold'>My Account</span>
                </CardHeader>
                <Collapse isOpen={toggle === -1 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/user/details`}>
                            <span className='fa fa-user-circle'></span> Personal Details
                        </Link>
                        <Link to={`${props.url}/user/update`}>
                            <span className='fa fa-pencil-square-o'></span> Update Information
                        </Link>
                        <Link to={`${props.url}/user/password`}>
                            <span className='fa fa-key'></span> Change Password
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 1 ? setToggle(0) : setToggle(1)}}>
                    <span className='font-weight-bold'>Patient</span>
                </CardHeader>
                <Collapse isOpen={toggle === 1 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/patient/all`}>
                            <span className='fa fa-user'></span> All Patients
                        </Link>
                        <Link to={`${props.url}/patient/new`}>
                            <span className='fa fa-user-plus'></span> Add Patient
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 2 ? setToggle(0) : setToggle(2)}}>
                    <span className='font-weight-bold'>Doctors</span>
                </CardHeader>
                <Collapse isOpen={toggle === 2 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/doctor/all`}>
                            <span className='fa fa-user-md'></span> All Doctors
                        </Link>
                        <Link to={`${props.url}/doctor/new`}>
                            <span className='fa fa-user-plus'></span> Add Doctor
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 3 ? setToggle(0) : setToggle(3)}}>
                    <span className='font-weight-bold'>Staff</span>
                </CardHeader>
                <Collapse isOpen={toggle === 3 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/staff/all`}>
                            <span className='fa fa-users'></span> All Staff Members
                        </Link>
                        <Link to={`${props.url}/staff/new`}>
                            <span className='fa fa-user-plus'></span> Add Staff Member
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 4 ? setToggle(0) : setToggle(4)}}>
                    <span className='font-weight-bold'>Appointments</span>
                </CardHeader>
                <Collapse isOpen={toggle === 4 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/appointment/previous`}>
                            <span className='fa fa-history'></span> Appointments History
                        </Link>
                        <Link to={`${props.url}/appointment/schedule`}>
                            <span className='fa fa-calendar'></span> Scheduled Appointments
                        </Link>
                        <Link to={`${props.url}/appointment/new`}>
                            <span className='fa fa-calendar-plus-o'></span> New Appointment
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 5 ? setToggle(0) : setToggle(5)}}>
                    <span className='font-weight-bold'>Ward Services</span>
                </CardHeader>
                <Collapse isOpen={toggle === 5 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/room/current`}>
                            <span className='fa fa-bed'></span> Patients Admitted
                        </Link>
                        <Link to={`${props.url}/room/history`}>
                            <span className='fa fa-history'></span> History
                        </Link>
                        <Link to={`${props.url}/room/admit`}>
                            <span className='fa fa-plus-square'></span> Admit a patient
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 6 ? setToggle(0) : setToggle(6)}}>
                    <span className='font-weight-bold'>Inventory</span>
                </CardHeader>
                <Collapse isOpen={toggle === 6 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/stock/current`}>
                            <span className='fa fa-cube'></span> Items in Stock
                        </Link>
                        <Link to={`${props.url}/stock`}>
                            <span className='fa fa-cubes'></span> All Stock
                        </Link>
                        <Link to={`${props.url}/stock/add`}>
                            <span className='fa fa-plus'></span> Add Item
                        </Link>
                        <Link to={`${props.url}/stock/inventory`}>
                            <span className={'fa fa-ambulance'}></span> Add Supplies
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
}

export default withRouter(ManagerSideBar);