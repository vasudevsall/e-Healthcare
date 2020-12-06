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
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
}

export default withRouter(ManagerSideBar);