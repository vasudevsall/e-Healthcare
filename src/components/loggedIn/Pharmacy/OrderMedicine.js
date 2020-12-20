import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button, Col, Row} from 'reactstrap';
import PharmacyService from '../../../services/PharmacyService';
import UserService from '../../../services/UserService';

class OrderMedicine extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            medId: '',
            quantity: 0,
            errMess: '',
            name: '',
            phone: '',
            gender: '',
            dob: '',
            search: '',
            medicines: [],
            isMedicine: false,
            successMess: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchMedicine = this.searchMedicine.bind(this);
        this.findTotalPrice = this.findTotalPrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.toUnmout = false;

        UserService.getUserDetails()
        .then((resp) => {
            if(!this.toUnmout) {
                let dt = resp.data.dateOfBirth.split("-");
                let formattedDate = `${dt[2]}-${dt[1]}-${dt[0]}`
                this.setState({
                    name: resp.data.name,
                    phone: resp.data.phoneNumber,
                    gender: resp.data.gender,
                    dob: formattedDate
                })
            }
        }).catch((err) => {
            this.props.history.push("/login");
        })

    }

    componentWillUnmount() {
        this.toUnmout = true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.medId === '') {
            this.setState({
                errMess: 'Please select a medicine',
                search: '',
                medId: '',
                address: '',
                quantity: 0
            });
        } else if(this.state.quantity === 0) {
            this.setState({
                errMess: 'Please select order quantity'
            })
        }
        PharmacyService.postMedicineOrder(this.state.medId, this.state.quantity, this.state.address)
            .then((resp) => {
                this.setState({
                    successMess: 'Your order is placed successfully'
                })
            })
            .catch((err) => {
                this.setState({
                    errMess: err.message
                })
            })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });

    }

    searchMedicine() {
        PharmacyService.searchMedicine(this.state.search)
            .then((resp) => {
                this.setState({
                    medicines: resp.data,
                    isMedicine: true
                })
            }).catch((err) => {
                this.setState({
                    errMess: 'Cannot fetch medicines due to error'
                })
            });
    }

    findTotalPrice() {
        let baseValue = 0.00;
        let medicine;
        for(medicine of this.state.medicines) {
            console.log("1 " + typeof medicine.medId);
            console.log("2 " + typeof this.state.medId);
            if(medicine.medId === parseInt(this.state.medId, 10))
            {
                console.log("Here");
                baseValue = medicine.price;
                break;
            }
        }
        return this.state.quantity * baseValue;
    }

    render() {
        const medicineOptions = this.state.medicines.map((medicine) => {
            return (
                <option key={medicine.medId} value={medicine.medId}>
                    {medicine.name}
                </option>
            );
        })
        const getPrice = this.findTotalPrice();
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Order Medicine</h4>
                        <hr/>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor='form-name' sm={4}>Name:</Label>
                        <Col sm={6}>
                            <Input type='text' name='name' id='form-name'
                                placeholder='Name' value={this.state.name} 
                                onChange = {this.handleChange}
                                required disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-phone' sm={4}>Phone Number:</Label>
                        <Col sm={6}>
                            <Input type='text' name='phone' id='form-phone'
                                placeholder='Enter without +91' value={this.state.phone}
                                onChange = {this.handleChange}
                                required disabled
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='form-dob' sm={4}>Date Of Birth:</Label>
                        <Col sm={6}>
                            <Input type='date' name='dob' id='form-dob'
                                placeholder='Date Of Birth' value={this.state.dob}
                                onChange = {this.handleChange}
                                disabled required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='Gender' sm={4}>Gender:</Label>
                        <Col sm={6}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'M'} 
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'M'}
                                                disabled
                                            />{' '}
                                            Male
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'F'}
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'F'}
                                                disabled
                                            />{' '}
                                            Female
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='gender' value={'O'}
                                                onChange={this.handleChange}
                                                checked = {this.state.gender === 'O'}
                                                disabled
                                            />{' '}
                                            Other
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="form-search" sm={4}>Search Medicine:</Label>
                        <Col sm={6}>
                            <Input type='text' name='search' value={this.state.search}
                                id='form-search' onChange={this.handleChange} 
                                placeholder="Enter Search String"
                                required
                            />
                        </Col>
                        <Col sm={1}>
                            <Button onClick={this.searchMedicine}>
                                <span className='fa fa-search fa-lg'></span>
                            </Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-medicine'>Select Medicine:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.medId}
                                name='medId' id='form-medicine' placeholder='Select One'
                                onChange = {this.handleChange}
                                required
                            >
                                <option selected disabled hidden value=''>Select One</option>
                                {medicineOptions}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-address'>Address:</Label>
                        <Col sm={6}>
                            <Input type='text' value={this.state.address}
                                name='address' id='form-address' placeholder='Address'
                                onChange={this.handleChange}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4} htmlFor='form-quantity'>Quantity:</Label>
                        <Col sm={6}>
                            <Input type='select' value={this.state.quantity}
                                name='quantity' id='form-quantity' placeholder='Select One'
                                onChange = {this.handleChange}
                                required
                            >
                                <option selected disabled hidden value={0}>Select One</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Total Price:</Label>
                        <Label sm={6}>Rs. {getPrice}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Col className='offset-4' sm={6}>
                            <Button type='submit'>
                                Place Order
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Col>
                    <span className='text-danger'>{this.state.errMess}</span>
                </Col>
                <Col>
                    <span className='text-success'>{this.state.successMess}</span>
                </Col>
            </div>
        );
    }
}

export default withRouter(OrderMedicine);