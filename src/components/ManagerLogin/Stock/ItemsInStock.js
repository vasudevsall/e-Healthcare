import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import StockService from "../../../services/StockService";
import {Table, FormGroup, Form, Input, Col, Row, Button, Label} from 'reactstrap';

class ItemsInStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            allStock: [],
            stockAvailable: false,
            errMess: '',
            name: '',
            expire: false
        }
        this.handleFilter = this.handleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        StockService.getAllInStock()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        stock: resp.data,
                        allStock: resp.data,
                        stockAvailable: true,
                        errMess: ''
                    })
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Error in fetching stock details!'
                    })
                }
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    handleFilter(event) {
        event.preventDefault();
        let item;
        let filterItems = [];
        for(item of this.state.allStock) {
            let name = item.medId.name;
            name = name.toLowerCase();
            let search = this.state.name.toLowerCase();
            let d = item.expiry.split("-");
            let date = new Date(d[0], d[1], d[2]);
            if(name.includes(search)) {
                if(this.state.expire && date > new Date())
                    continue
                filterItems.push(item);
            }
        }

        this.setState({
            stock: filterItems
        });
    }

    clearFilter() {
        this.setState({
            stock: this.state.allStock,
            name: '',
            expire: false
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
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
                    <td>{item.medId.name}</td>
                    <td>{item.medId.manufacturer}</td>
                    <td>{item.manufacture}</td>
                    <td>{item.expiry}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
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

    render() {
        const table = this.formTable();
        return(
            <div className='container-fluid'>
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
                                <Col md={3} style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                                    <Label check>
                                        <Input
                                            type='checkbox' name='expire'
                                            checked={this.state.expire} onChange={this.handleChange}
                                            style={{position: "relative", marginLeft: "0"}}
                                        /> {' '}
                                        Expired
                                    </Label>
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

export default withRouter(ItemsInStock);