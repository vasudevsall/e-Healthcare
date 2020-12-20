import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Form, FormGroup, Button, Alert, Label, Col, Input, Row} from 'reactstrap';
import StockService from "../../../services/StockService";

class AddToStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            meds: [],
            errMess: '',
            medId: 0,
            batch: '',
            manufacture: '',
            expire: '',
            price: 0,
            quantity: 0,
            errAlert: false,
            successAlert: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchMeds = this.searchMeds.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        StockService.addSupply(this.state.medId, this.state.batch,
            this.state.manufacture, this.state.expire, this.state.price, this.state.quantity
        ).then((resp) => {
            this.setState({
                name: '',
                meds: [],
                errMess: '',
                medId: 0,
                batch: '',
                manufacture: '',
                expire: '',
                price: 0,
                quantity: 0,
                errAlert: false,
                successAlert: true
            })
        }).catch((err) => {
            this.setState({
                errAlert: true,
                successAlert: false,
                errMess: err.response.data
            })
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

    searchMeds() {
        StockService.searchItemByName(this.state.name)
            .then((resp) => {
                this.setState({
                    meds: resp.data
                })
            }).catch((err) => {
                this.setState({
                    errAlert: true,
                    errMess: 'Unable to fetch medicines'
                })
        })
    }

    toggleSuccess() {
        this.setState({
            successAlert: !this.state.successAlert
        })
    }

    toggleError() {
        this.setState({
            errorAlert: !this.state.errorAlert
        })
    }

    render() {
        const selectOptions = this.state.meds.map((med) => {
            return(
                <option key={med.id} value={med.id}>{med.name}</option>
            );
        })
        return (
            <div className='container-fluid'>
                <div className={'row mb-2'}>
                    <div className='col-12'>
                        <h4>Add To Stock</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className={'col-12'}>
                        <Alert color={'success'} isOpen={this.state.successAlert} toggle={this.toggleSuccess}>
                            Successfully added item to stock!
                        </Alert>
                    </div>
                    <div className={'col-12'}>
                        <Alert color={'danger'} isOpen={this.state.errAlert} toggle={this.toggleError}>
                            {this.state.errMess}
                        </Alert>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4}>Search Item:</Label>
                        <Col sm={4}>
                            <div className={'container-fluid'} style={{padding: 0}}>
                                <Row>
                                    <Col xs={9}>
                                        <Input name='name' type='text'
                                               placeholder='Item Name'
                                               onChange={this.handleChange}
                                               value={this.state.name}
                                               required
                                        />
                                    </Col>
                                    <Col xs={2}>
                                        <Button onClick={this.searchMeds}>
                                            <span className={'fa fa-search'}/>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Select Item:</Label>
                        <Col sm={4}>
                            <Input name={'medId'} type={'select'}
                                   onChange={this.handleChange}
                                   value={this.state.medId}
                                   required
                            >
                                <option selected disabled hidden value={0}>Select One</option>
                                {selectOptions}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Batch No:</Label>
                        <Col sm={4}>
                            <Input name='batch' type='text'
                                   value={this.state.batch}
                                   onChange = {this.handleChange}
                                   placeholder='Batch No.'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Manufacture Date:</Label>
                        <Col sm={4}>
                            <Input name='manufacture' type='date'
                                   value={this.state.manufacture}
                                   onChange = {this.handleChange}
                                   placeholder='Manufacture'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Expire Date:</Label>
                        <Col sm={4}>
                            <Input name='expire' type='date'
                                   value={this.state.expire}
                                   onChange = {this.handleChange}
                                   placeholder='Expire'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Price:</Label>
                        <Col sm={4}>
                            <Input name='price' type='number'
                                   value={this.state.price}
                                   onChange = {this.handleChange}
                                   placeholder='Expire'
                                   step={0.01}
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Quantity:</Label>
                        <Col sm={4}>
                            <Input name='quantity' type='number'
                                   value={this.state.quantity}
                                   onChange = {this.handleChange}
                                   placeholder='Quantity'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Button type={'submit'}>
                            Add Item to Stock
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(AddToStock);