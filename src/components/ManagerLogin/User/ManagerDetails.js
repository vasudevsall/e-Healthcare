import React from 'react';
import {Table} from 'reactstrap';

function ManagerDetails(props) {

    const printGender = (gender) => {
        if(gender === 'M' || gender === 'm')
            return "Male";
        else if(gender === 'F' || gender === 'f')
            return "Female";
        else
            return "Other";
    }

    return(
        <div className='fluid-container'>
            <div className='row mb-2'>
                <div className='col-12'>
                    <h4>Personal Details:</h4>
                    <hr/>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8 col-12'>
                    <Table borderless>
                        <tr>
                            <th>Username:</th>
                            <td>{props.userInfo.username}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>{props.userInfo.name}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>{props.userInfo.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Gender:</th>
                            <td>{printGender(props.userInfo.gender)}</td>
                        </tr>
                        <tr>
                            <th>Date Of Birth:</th>
                            <td>{props.userInfo.dateOfBirth}</td>
                        </tr>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ManagerDetails;