import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Form, FormGroup, Label, Col, Input, Button, Table} from 'reactstrap';
import PharmacyService from '../../../services/PharmacyService';

class SearchMedicine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicine: '',
            medicines: [],
            isMedicine: false,
            errMess: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.makeTable = this.makeTable.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        PharmacyService.searchMedicine(this.state.medicine)
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    makeTable() {
        if(!this.state.isMedicine) {
            return(<></>);
        } else {
            if(this.state.medicines.length > 0) {
                let counter = 1;
                const tableBody = this.state.medicines.map((med) => {
                    return(
                        <tr key={med.medId}>
                            <td>{counter++}</td>
                            <td>{med.name}</td>
                            <td>{med.manufacturer}</td>
                            <td>{med.category}</td>
                            <td>{med.salt}</td>
                            <td>{med.manufacture}</td>
                            <td>{med.expire}</td>
                            <td>{med.price}</td>
                        </tr>
                    );
                });
                return(
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Category</th>
                                <th>Salt</th>
                                <th>Manufacture Date</th>
                                <th>Expiry Date</th>
                                <th>Price (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                );
            } else {
                return(
                    <div className='text-danger'>
                        No medicines to display
                    </div>
                );
            }
        }
    }

    render() {
        const formTable = this.makeTable();

        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Search Pharmacy</h4>
                        <hr/>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor='medicine' sm={4}>Enter Search String:</Label>
                        <Col sm={4}>
                            <Input type='text' required
                                name='medicine' id='medicine'
                                value={this.state.searchString} onChange={this.handleChange} 
                            />
                        </Col>
                        <Col sm={1}>
                            <Button type='submit'>
                                <span className='fa fa-search fa-lg'></span>
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className='row'>
                    <div className='col-12 table-div'>
                        {formTable}
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

export default withRouter(SearchMedicine);