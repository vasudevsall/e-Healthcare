import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Form, FormGroup, Label, Input, Col, Row, Alert} from "reactstrap";
import DocService from "../../../services/DocService";

class UpdateSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monday_morning_start: '',
            monday_morning_end: '',
            monday_evening_start: '',
            monday_evening_end: '',
            tuesday_morning_start: '',
            tuesday_morning_end: '',
            tuesday_evening_start: '',
            tuesday_evening_end: '',
            wednesday_morning_start: '',
            wednesday_morning_end: '',
            wednesday_evening_start: '',
            wednesday_evening_end: '',
            thursday_morning_start: '',
            thursday_morning_end: '',
            thursday_evening_start: '',
            thursday_evening_end: '',
            friday_morning_start: '',
            friday_morning_end: '',
            friday_evening_start: '',
            friday_evening_end: '',
            saturday_morning_start: '',
            saturday_morning_end: '',
            saturday_evening_start: '',
            saturday_evening_end: '',
            errMess: '',
            isAlertOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    toggleAlert() {
        this.setState({
            isAlertOpen: !this.state.isAlertOpen
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            mon_morning: `${this.state.monday_morning_start}:00 - ${this.state.monday_morning_end}:00`,
            mon_evening: `${this.state.monday_evening_start}:00 - ${this.state.monday_evening_end}:00`,
            tue_morning: `${this.state.tuesday_morning_start}:00 - ${this.state.tuesday_morning_end}:00`,
            tue_evening: `${this.state.tuesday_evening_start}:00 - ${this.state.tuesday_evening_end}:00`,
            wed_morning: `${this.state.wednesday_morning_start}:00 - ${this.state.wednesday_morning_end}:00`,
            wed_evening: `${this.state.wednesday_evening_start}:00 - ${this.state.wednesday_evening_end}:00`,
            thr_morning: `${this.state.thursday_morning_start}:00 - ${this.state.thursday_morning_end}:00`,
            thr_evening: `${this.state.thursday_evening_start}:00 - ${this.state.thursday_evening_end}:00`,
            fri_morning: `${this.state.friday_morning_start}:00 - ${this.state.friday_morning_end}:00`,
            fri_evening: `${this.state.friday_evening_start}:00 - ${this.state.friday_evening_end}:00`,
            sat_morning: `${this.state.saturday_morning_start}:00 - ${this.state.saturday_morning_end}:00`,
            sat_evening: `${this.state.saturday_evening_start}:00 - ${this.state.saturday_evening_end}:00`
        }

        DocService.postSchedule(data)
            .then((resp) => {
                this.setState({
                    monday_morning_start: '',
                    monday_morning_end: '',
                    monday_evening_start: '',
                    monday_evening_end: '',
                    tuesday_morning_start: '',
                    tuesday_morning_end: '',
                    tuesday_evening_start: '',
                    tuesday_evening_end: '',
                    wednesday_morning_start: '',
                    wednesday_morning_end: '',
                    wednesday_evening_start: '',
                    wednesday_evening_end: '',
                    thursday_morning_start: '',
                    thursday_morning_end: '',
                    thursday_evening_start: '',
                    thursday_evening_end: '',
                    friday_morning_start: '',
                    friday_morning_end: '',
                    friday_evening_start: '',
                    friday_evening_end: '',
                    saturday_morning_start: '',
                    saturday_morning_end: '',
                    saturday_evening_start: '',
                    saturday_evening_end: '',
                    isAlertOpen: true
                })
            }).catch((err) => {
                this.setState({
                    errMess: err.response.data
                })
        })
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Update Schedule</h4>
                        <hr/>
                    </div>
                </div>
                <div className={'row mb-2'}>
                    <div className='col-12'>
                        <Alert color={'success'} isOpen={this.state.isAlertOpen} toggle={this.toggleAlert}>
                            Your schedule has been updated successfully!
                        </Alert>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <Form onSubmit={this.handleSubmit}>
                            <Row className={'mb-4'}>
                                <Label style={{textDecoration: 'underline'}} sm={3}>Day</Label>
                                <Label style={{textDecoration: 'underline'}} sm={3}>Start</Label>
                                <Label style={{textDecoration: 'underline'}} sm={3}>End</Label>
                            </Row>
                            <FormGroup row>
                                <Label sm={3}>Monday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='monday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.monday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='monday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.monday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Monday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='monday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.monday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='monday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.monday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Tuesday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='tuesday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.tuesday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='tuesday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.tuesday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Tuesday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='tuesday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.tuesday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='tuesday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.tuesday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Wednesday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='wednesday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.wednesday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='wednesday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.wednesday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Wednesday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='wednesday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.wednesday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='wednesday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.wednesday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Thursday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='thursday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.thursday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='thursday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.thursday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Thursday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='thursday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.thursday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='thursday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.thursday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Friday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='friday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.friday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='friday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.friday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Friday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='friday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.friday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='friday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.friday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Saturday Morning:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='saturday_morning_start'
                                        onChange={this.handleChange}
                                        value={this.state.saturday_morning_start}
                                        min={'09:00'} max={'11:00'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='saturday_morning_end'
                                        onChange={this.handleChange}
                                        value={this.state.saturday_morning_end}
                                        min={'12:00'} max={'13:00'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Saturday Evening:</Label>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='saturday_evening_start'
                                        onChange={this.handleChange}
                                        value={this.state.saturday_evening_start}
                                        min={'14:30'} max={'15:30'}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        type='time'
                                        name='saturday_evening_end'
                                        onChange={this.handleChange}
                                        value={this.state.saturday_evening_end}
                                        min={'16:30'} max={'17:30'}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col className={'offset-sm-3'} sm={3}>
                                    <Input type={'submit'}
                                           value={'Update'}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <label className={'text-bold text-danger'}>{this.state.errMess}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateSchedule);