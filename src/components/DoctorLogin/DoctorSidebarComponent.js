import React, {useState} from 'react';
import {Collapse, Card, CardHeader, CardBody} from 'reactstrap';
import {Link, withRouter} from "react-router-dom";

function DoctorSidebar(props) {
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
                    <span className='font-weight-bold'>My Account</span>
                </CardHeader>
                <Collapse isOpen={toggle === 1}>
                    <CardBody>
                        <Link to={`${props.url}/user/details`}>
                            <span className='fa fa-user-circle'/> Personal Details
                        </Link>
                        <Link to={`${props.url}/user/update`}>
                            <span className='fa fa-pencil-square-o'/> Update Information
                        </Link>
                        <Link to={`${props.url}/user/password`}>
                            <span className='fa fa-key'/> Change Password
                        </Link>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
}

export default withRouter(DoctorSidebar);