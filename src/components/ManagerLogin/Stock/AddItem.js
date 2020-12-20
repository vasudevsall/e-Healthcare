import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Form, FormGroup, Col, Input, Label, Button, Alert} from 'reactstrap';
import StockService from "../../../services/StockService";

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            manufacturer: '',
            category: '',
            details: '',
            successAlert: false,
            errorAlert: false,
            errMess: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        StockService.addItem(this.state.name, this.state.manufacturer,
            this.state.category, this.state.details
        ).then((resp) => {
            this.setState({
                name: '',
                manufacturer: '',
                category: '',
                details: '',
                successAlert: true,
                errorAlert: false,
                errMess: ''
            })
        }).catch((err) => {
            this.setState({
                errorAlert: true,
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
        return (
            <div className='container-fluid'>
                <div className={'row mb-2'}>
                    <div className='col-12'>
                        <h4>Add New Item</h4>
                        <hr/>
                    </div>
                </div>
                <div className={'row mb-2'}>
                    <div className={'col-12'}>
                        <Alert toggle={this.toggleSuccess} isOpen={this.state.successAlert} color={'success'}>
                            Item added successfully!
                        </Alert>
                    </div>
                    <div className={'col-12'}>
                        <Alert  toggle={this.toggleError} isOpen={this.state.errorAlert} color={'danger'}>
                            {this.state.errMess}
                        </Alert>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4}>Name:</Label>
                        <Col sm={4}>
                            <Input name='name' type='text'
                                   value={this.state.name}
                                   onChange = {this.handleChange}
                                   placeholder='Name'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Manufacturer:</Label>
                        <Col sm={4}>
                            <Input name='manufacturer' type='text'
                                   value={this.state.manufacturer}
                                   onChange = {this.handleChange}
                                   placeholder='Manufacturer'
                                   required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Category</Label>
                        <Col sm={4}>
                            <Input name='category' type='select'
                                   value={this.state.category}
                                   onChange = {this.handleChange} required
                            >
                                <option selected disabled hidden value={''}>Select One</option>
                                <option value='General'>General</option>
                                <option value='Prescription'>Prescription</option>
                                <option value='Controlled'>Controlled</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Details</Label>
                        <Col sm={4}>
                            <Input type={'textarea'} name='details'
                                   value={this.state.details}
                                   onChange={this.handleChange}
                                   placeholder={'Details'}
                                   required
                                   rows={4}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={4} className={'offset-sm-4'}>
                            <Button type={'submit'}>Add Item</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(AddItem);