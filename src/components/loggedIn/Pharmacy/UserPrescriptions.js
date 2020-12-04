import React, {Component} from 'react';
import PharmacyService from '../../../services/PharmacyService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class UserPrescriptions extends Component {

    constructor(props) {
        super(props)
        this.state ={
            prescription: [],
            prescriptionsAvailable: false,
            errMess: ''
        }
        this.formTable = this.formTable.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        PharmacyService.getPrescriptions()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        prescription: resp.data,
                        prescriptionsAvailable: true
                    });
                }
            })
            .catch((err) => {
                UserService.verifyLogin()
                    .then((resp) => {
                        if(!this.toUnmount) {
                            this.setState({
                                errMess: 'An error occured'
                            });
                        }
                    }).catch((err) => {
                        this.props.history.push('/login');
                    });
            });
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    formatDate(date) {
        let dt = date.split(" ")
        return dt[0];
    }

    formTable() {
        if(!this.state.prescriptionsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.prescription.length > 0) {
                let counter = 1;
                const tableBody = this.state.prescription.map((prescription) => {
                    return(
                        <tr key={prescription.serial}>
                            <td>{counter++}</td>
                            <td>{prescription.prescription}</td>
                            <td>{`Dr. ${prescription.doctor}`}</td>
                            <td>{this.formatDate(prescription.date)}</td>
                        </tr>
                    );
                });
                return(
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prescription</th>
                                <th>Doctor</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                );
            } else {
                return(
                    <div className='full-flex-span'>
                        No prescriptions to display
                    </div>
                );
            }
        }
    }

    render() {
        const table = this.formTable();

        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Your Prescriptions</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-lg-8 table-div'>
                        {table}
                    </div>
                </div>
                <div className='row'>
                    <div className='px-2 mx-2 mb-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/pharmacy/search`}>
                            Search Medicine
                        </Link>
                    </div>
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/pharmacy/order`}>
                            Order Medicine
                        </Link>
                    </div>
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/pharmacy/orders`}>
                            Your Orders
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(UserPrescriptions);