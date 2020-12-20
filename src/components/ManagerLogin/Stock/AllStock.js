import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Row, Table, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {withRouter} from "react-router-dom";
import StockService from "../../../services/StockService";

class AllStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            allStock: [],
            stockAvailable: false,
            errMess: '',
            name: '',
            details: '',
            isModalOpen: false,
            currentStock: [],
            currentStockAvailable: false,
            modalErr: ''
        }
        this.formTable = this.formTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.formModalBody = this.formModalBody.bind(this);
    }

    handleFilter(event) {
        event.preventDefault();

        let item;
        let filterItems = [];
        for(item of this.state.allStock) {
            let name = item.name;
            let details = item.salt;
            name = name.toLowerCase();
            details = details.toLowerCase();
            let search = this.state.name.toLowerCase();
            let searchD = this.state.details.toLowerCase();
            if(name.includes(search) && details.includes(searchD)) {
                filterItems.push(item);
            }
        }

        this.setState({
            stock: filterItems
        });
    }

    componentDidMount() {
        this.toUnmount = false;
        StockService.getAll()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        stock: resp.data,
                        allStock: resp.data,
                        stockAvailable: true
                    });
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                       errMess: 'There was an error in fetching stock details'
                    });
                }
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    openModal(id) {
        StockService.findStockById(id)
            .then((resp) => {
                this.setState({
                    currentStock: resp.data,
                    currentStockAvailable: true,
                    isModalOpen: true
                })
            }).catch((err) => {
                this.setState({
                    modalErr: 'Unable to fetch current stock details.'
                })
        })
    }

    formModalBody() {
        if(!this.state.currentStockAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }
        if(this.state.currentStock.length <= 0) {
            return(
                <div className='full-flex-span'>
                    <label className={'font-weight-bold'}>Item not in stock</label>
                </div>
            );
        }
        let i = 1;
        const tableBody = this.state.currentStock.map((item) => {
            return(
                <tr key={item.id}>
                    <td>{i++}</td>
                    <td>{item.medId.name}</td>
                    <td>{item.manufacture}</td>
                    <td>{item.expiry}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
            );
        });
        return(
            <Table hover bordered striped responsive size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Manufacture</th>
                    <th>Expire</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
        );
    }

    formTable() {
        if(!this.state.stockAvailable){
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }
        if(this.state.allStock.length === 0) {
            return(
                <div className='full-flex-span'>
                    <label className='font-weight-bold'>No items in stock</label>
                </div>
            );
        }
        if(this.state.stock.length === 0) {
            return(
                <div className='full-flex-span'>
                    <label className='font-weight-bold'>No items matching current filter.</label>
                </div>
            );
        }

        let i = 1;
        const tableBody = this.state.stock.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{i++}</td>
                    <td>{item.name}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.category}</td>
                    <td style={{whiteSpace: 'normal'}}>{item.salt}</td>
                    <td>
                        <button onClick={() => this.openModal(item.id)} className={'btn btn-sm btn-outline-info'}>
                            <span className={'fa fa-search'}/>
                        </button>
                    </td>
                </tr>
            );
        })

        return(
            <Table hover bordered striped responsive size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Category</th>
                    <th>Details</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </Table>
        );
    }

    render() {
        const table = this.formTable();
        const modalBody = this.formModalBody();
        return(
            <div className='container-fluid'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Current Stock</ModalHeader>
                    <ModalBody>
                        {modalBody}
                    </ModalBody>
                </Modal>
                <div className={'row mb-2'}>
                    <div className='col-12'>
                        <h4>Items In Stock</h4>
                        <hr/>
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-12'>
                        <div className='table-div'>
                            {table}
                        </div>
                        <hr className='m-0' />
                    </div>
                </div>

                <Row className='mb-3'>
                    <Col xs={12}>
                        <Form onSubmit={this.handleFilter}>
                            <FormGroup row>
                                <Col md={3}>
                                    <Input name='name' type='text'
                                           id='form-name' placeholder='Name'
                                           value={this.state.name}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Input name='details' type='text'
                                           id='form-details' placeholder='Details'
                                           value={this.state.details}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button type='submit' className='btn-dark'>
                                        <span className='fa fa-search'/>
                                    </Button>
                                    <Button className='mx-1 btn-danger' onClick={this.clearFilter}>
                                        <span className='fa fa-times'/>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(AllStock);