import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import ConsultService from "../../../services/ConsultService";
import {Table, Form, FormGroup, Input, Button, Col, Row, UncontrolledTooltip} from "reactstrap";

class PreviousOnline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            allChats: [],
            chatsAvailable: false,
            errMess: '',
            name: '',
            title: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleFilter(event) {
        event.preventDefault();

        let chat;
        let filterChats = [];
        for(chat of this.state.allChats) {
            let name = chat.doctor.firstName + chat.doctor.lastName;
            let title = chat.title;
            name = name.toLowerCase();
            title = title.toLowerCase();
            let search = this.state.name.toLowerCase();
            let searchT = this.state.title.toLowerCase();
            if(name.includes(search) && title.includes(searchT)) {
                filterChats.push(chat);
            }
        }

        this.setState({
            chats: filterChats
        });
    }

    handleClear(event) {
        this.setState({
            chats: this.state.allChats,
            name: '',
            title: ''
        })
    }

    componentDidMount() {
        this.toUnmount = false;
        if(this.props.past) {
            ConsultService.getConsultationHistory()
                .then((resp) => {
                    if (!this.toUnmount) {
                        this.setState({
                            chats: resp.data,
                            allChats: resp.data,
                            chatsAvailable: true,
                            errMess: ''
                        })
                    }
                }).catch((err) => {
                if (!this.toUnmount) {
                    this.setState({
                        errMess: 'Error while fetching your online consultation history'
                    })
                }
            })
        } else {
            ConsultService.getConsultations()
                .then((resp) => {
                    if (!this.toUnmount) {
                        this.setState({
                            chats: resp.data,
                            allChats: resp.data,
                            chatsAvailable: true,
                            errMess: ''
                        })
                    }
                }).catch((err) => {
                if (!this.toUnmount) {
                    this.setState({
                        errMess: 'Error while fetching your online consultation history'
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    formatDate(date, noTime = true) {
        let dt = date.split("T");
        let ymd = dt[0].split("-");
        let time = dt[1].split("+");
        let t = time[0].split(".");
        if(noTime)
            return (ymd[2] + "-" + ymd[1] + "-" + ymd[0]);
        return t[0];
    }

    formTable() {
        if(!this.state.chatsAvailable) {
            return(
                <div className='full-flex-span'>
                    <span className = 'fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }
        if(this.state.allChats.length === 0) {
            return(
                <div className='full-flex-span'>
                    <label className='font-weight-bold'>
                        {(this.props.past)?'No Online Consultation History found!':'No new messages'}
                    </label>
                </div>
            );
        }
        if(this.state.chats.length === 0) {
            return(
                <div className='full-flex-span'>
                    <label className='font-weight-bold'>
                        No online consultations matching your current filters
                    </label>
                </div>
            )
        }
        let i = 1;
        const tableBody = this.state.chats.map((chat) => {
            return(
                <tr key={chat.id}>
                    <td>{i++}</td>
                    <td>{(this.props.doctor)? `${chat.user.firstName} ${chat.user.lastName}`:
                        `Dr. ${chat.doctor.firstName} ${chat.doctor.lastName}`
                    }</td>
                    <td>{chat.title}</td>
                    <td>{this.formatDate(chat.started)}</td>
                    <td>{this.formatDate(chat.started, false)}</td>
                    <td>
                        <Link to={`${this.props.url}/consult/chat/${chat.id}`}
                              className='btn btn-sm btn-outline-info'
                              id={`chat-link-${chat.id}`}
                        >
                            <span className='fa fa-info-circle'/>
                        </Link>
                        <UncontrolledTooltip placement={'right'} target={`chat-link-${chat.id}`}>
                            Go to Chat
                        </UncontrolledTooltip>
                    </td>
                </tr>
            );
        });

        return(
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{(this.props.doctor)?'Patient': 'Doctor'}</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
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
        return(
            <div className='container-fluid'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>Online Consultation {(this.props.past)? 'History':''}</h4>
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
                                           id='form-name' placeholder='Doctor'
                                           value={this.state.name}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Input name='title' type='text'
                                           id='form-title' placeholder='Title'
                                           value={this.state.title}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button type='submit' className='btn-dark'>
                                        <span className='fa fa-search'/>
                                    </Button>
                                    <Button className='mx-1 btn-danger' onClick={this.handleClear}>
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

export default withRouter(PreviousOnline);