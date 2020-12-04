import React, {Component} from 'react';
import PharmacyService from '../../../services/PharmacyService';
import UserService from '../../../services/UserService';
import {withRouter} from 'react-router-dom';
import {Table, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';

class MedOrders extends Component {

    constructor(props) {
        super(props)
        this.state ={
            orders: [],
            ordersAvailable: false,
            errMess: '',
            isModalOpen: false,
            currentOrder: [],
            modalData: false,
            successMess: ''
        }
        this.formTable = this.formTable.bind(this);
        this.orderDelivered = this.orderDelivered.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalData = this.modalData.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        PharmacyService.getMedicneOrder()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        orders: resp.data,
                        ordersAvailable: true
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

    orderDelivered(delivered) {
        if(delivered) {
            return(
                <span className='text-success fa fa-check fa-lg'></span>
            );
        } else {
            return (<></>);
        }
    }

    formTable() {
        if(!this.state.ordersAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            if(this.state.orders.length > 0) {
                let counter = 1;
                const tableBody = this.state.orders.map((order) => {
                    return(
                        <tr key={order.id}>
                            <td>{counter++}</td>
                            <td>{order.medId.medId.name}</td>
                            <td>{order.medId.expiry}</td>
                            <td>{order.price}</td>
                            <td>{order.date}</td>
                            <td>{this.orderDelivered(order.delivered)}</td>
                            <td>
                                <button className='btn btn-dark mx-1' onClick={() => this.openModal(order.id)}>
                                    Details
                                </button>
                                <button disabled={order.delivered} 
                                    className='btn mx-1 btn-danger' onClick={() => this.cancelOrder(order.id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    );
                });
                return(
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Expiry Date</th>
                                <th>price</th>
                                <th>Date Placed</th>
                                <th>Delvered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                );
            }
        }
    }

    cancelOrder(id) {
        PharmacyService.delOrder(id)
        .then((resp) => {
            PharmacyService.getMedicneOrder()
            .then((response) => {
                this.setState({
                    orders: response.data,
                    ordersAvailable: true
                })
            })
            .catch((err) => {
                this.setState({
                    errMess: 'Error fetching your order'
                })
            })
        }) .catch((err) => {
            this.setState({
                errMess: 'Cannot cancel your order'
            })
        })
    }

    openModal(id) {
        let order;
        let data;
        for(order of this.state.orders) {
            if(order.id === id) {
                data = order;
            }
        }
        this.setState({
            currentOrder: data,
            modalData: true,
            isModalOpen: true
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    modalData() {
        if(!this.state.modalData) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'></span>
                </div>
            );
        } else {
            return(
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <label>Order Id: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.id}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Name: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.medId.medId.name}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Manufacturer: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.medId.medId.manufacturer}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Manufacture Date: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.medId.manufacture}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Expiry Date: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.medId.expiry}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Base Price: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.medId.price}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Address: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.address}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Quantity: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.quantity}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Date Placed: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.date}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Toal Price: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.price}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label>Order Delivered: </label>
                    </div>
                    <div className='col-6'>
                        {this.state.currentOrder.delivered ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>
            );
        }
    }

    render() {
        const table = this.formTable();
        const formModal = this.modalData();
        return(
            <div className='fluid-container'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Order Details</ModalHeader>
                    <ModalBody>
                        {formModal}
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>All Orders</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 table-div'>
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
                            New Order
                        </Link>
                    </div>
                    <div className='px-2 mx-2'>
                        <Link className='btn btn-dark' to={`${this.props.url}/pharmacy/prescriptions`}>
                            Your Prescriptions
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(MedOrders);