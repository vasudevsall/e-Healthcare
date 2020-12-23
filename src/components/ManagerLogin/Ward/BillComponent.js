import React, { Component } from 'react';
import {useParams, withRouter, Link} from 'react-router-dom';
import {Table} from 'reactstrap';
import AccomodationService from '../../../services/AccomodationService'; 

class BillGeneration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            bookDetailsAvailable: false,
            errMess: '',
            billDetails: []
        }
    }

    printScreen() {
        window.print();
    }

    componentDidMount() {
        this.toUnmount = false;
        AccomodationService.dischargePatient(this.props.roomId)
        .then((resp) => {
            AccomodationService.getDetailsById(this.props.roomId)
            .then((response) => {
                if(!this.toUnmount) {
                    this.setState({
                        billDetails: resp.data,
                        bookDetails: response.data,
                        bookDetailsAvailable: true
                    })

                    console.log(this.state.billDetails)
                }
            })
            .catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Error getting bill details'
                    })
                }
            })
        }).catch((err) => {
            this.setState({
                errMess: 'Error discharging the patient'
            })
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    render() {
        if(!this.state.bookDetailsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }
        return(
            <div className='container bill'>
                <div className='row mb-3'>
                    <div className='icon col-12 d-flex justify-content-center align-items-center'>
                        <img src={process.env.PUBLIC_URL + '/images/logo.png'} height='70px' width='70px' alt='e'/>
                        <label>-HealthCare</label>
                    </div>
                </div>
                <div className={'row mb-5'}>
                    <div className={'col-12'}>
                        <label className={'font-weight-bold'}>Id: </label>{' '}
                        <label className={'font-weight-bold'}>{this.props.roomId}</label>
                    </div>
                    <div className={'col-12'}>
                        <label className={'font-weight-bold'}>Date: </label>{' '}
                        <label className={'font-weight-bold'}>{this.state.billDetails.Out.split(' ')[0]}</label>
                    </div>
                    <div className={'col-12'}>
                        <label className={'font-weight-bold'}>Name: </label>{' '}
                        <label className={'font-weight-bold'}>
                            {`${this.state.bookDetails.user.firstName} ${this.state.bookDetails.user.lastName}`}
                        </label>
                    </div>
                    <div className={'col-12'}>
                        <label className={'font-weight-bold'}>Phone Number: </label>{' '}
                        <label className={'font-weight-bold'}>
                            {`${this.state.bookDetails.user.phoneNumber}`}
                        </label>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div style={{height: '200px'}} className={'table-div'}>
                            <Table borderless>
                                <tbody>
                                <tr className={'mb-5'}>
                                    <th>#</th>
                                    <th>Particulars</th>
                                    <th>Base Price</th>
                                    <th>Days</th>
                                    <th>Total Amount</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        Admit from {this.state.bookDetails.checkin.split(' ')[0]} due to
                                        {' '}{this.state.bookDetails.details}
                                    </td>
                                    <td>
                                        {this.state.bookDetails.roomNo.price}
                                    </td>
                                    <td>
                                        {this.state.billDetails.Days}
                                    </td>
                                    <td>{this.state.billDetails.Bill}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <hr/>
                    </div>

                    <div className={'col-3 offset-7'}>
                        <label className={'font-weight-bold'}>Grand Total</label>
                    </div>
                    <div className={'col-2'}>
                        <label className={'font-weight-bold'}>{this.state.billDetails.Bill}</label>
                    </div>
                    <div className={'col-3 offset-7'}>
                        <label className={'font-weight-bold'}>Signature</label>
                    </div>
                </div>

                <div className={'row mt-5'}>
                    <button className={'btn btn-info mr-2'} onClick={this.printScreen}>Print</button>
                    <Link className={'btn btn-info'} to={'/manager'}>Dashboard</Link>
                </div>
            </div>
        );
    }
}

function Bill(props) {
    let { roomId } = useParams();

    return(
        <BillGeneration roomId={roomId} history={props.history} url={props.url} />
    );
}

export default withRouter(Bill);