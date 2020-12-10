import React, {useState} from 'react';
import {Collapse, Card, CardBody, CardHeader} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

function SideBar(props) {

    const [toggle, setToggle] = useState(0);
    return(
        <div id="sidebar" className='is-active'>
            <div className='container'>
                <h5 className='mb-3'>Welcome {props.userInfo.username}!</h5>
            </div>

            <Card>
                <CardHeader onClick={() => {props.history.push("/welcome")}}>
                    <span className='font-weight-bold'>Dashboard</span>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 1 ? setToggle(0) : setToggle(1)}}>
                    <span className='font-weight-bold'>My Account</span>
                </CardHeader>
                <Collapse isOpen={toggle === 1 ? true : false}>
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
                <CardHeader onClick={() => {toggle === 2 ? setToggle(0) : setToggle(2)}}>
                    <span className='font-weight-bold'>Appointments</span>
                </CardHeader>
                <Collapse isOpen={toggle === 2 ? true : false}>
                    <CardBody>
                        <Link to={`${props.url}/appointments/all`}>
                            <span className='fa fa-list-alt'></span> All Appointments
                        </Link>
                        <Link to={`${props.url}/appointments/history`}>
                            <span className='fa fa-history'></span> Previous Appointments
                        </Link>
                        <Link to={`${props.url}/appointments/scheduled`}>
                            <span className='fa fa-calendar'></span> Scheduled Appointments
                        </Link>
                        <Link to={`${props.url}/appointments/schedule`}>
                            <span className='fa fa-plus-square-o'></span> Schedule New
                        </Link>
                        <Link to={`${props.url}/online`}>
                            <span className='fa fa-wifi'></span> Online Consultation
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>

            <Card>
                <CardHeader onClick={() => {toggle === 3 ? setToggle(0) : setToggle(3)}}>
                    <span className='font-weight-bold'>Pharmacy</span>
                </CardHeader>
                <Collapse isOpen={toggle === 3 ? true : false}>
                    <CardBody>
                    <Link to={`${props.url}/pharmacy/prescriptions`}>
                            <span className='fa fa-user-md'></span> Your Prescriptions
                        </Link>
                        <Link to={`${props.url}/pharmacy/order`}>
                            <span className='fa fa-medkit'></span> New Order
                        </Link>
                        <Link to={`${props.url}/pharmacy/orders`}>
                            <span className='fa fa-truck'></span> Your Orders
                        </Link>
                        <Link to={`${props.url}/pharmacy/search`}>
                            <span className='fa fa-search'></span> Search Medicine
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
}

export default withRouter(SideBar);