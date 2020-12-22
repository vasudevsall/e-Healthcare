import React, {Component} from 'react';
import {withRouter, useParams} from "react-router-dom";
import ConsultService from "../../../services/ConsultService";
import {Form, FormGroup, Input, Col, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import UserService from "../../../services/UserService";

class OnlineChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            chatsAvailable: false,
            detailsAvailable: false,
            details: [],
            errMess: '',
            message: '',
            userDetails: [],
            userDetailsAvailable: false,
            isModalOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.endChat = this.endChat.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleKeyDown(event) {
        if(event.keyCode === 13 && event.shiftKey === false) {
            this.handleSubmit(event);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.details.ended) {
            return;
        }

        ConsultService.postMessage(this.props.consultId, this.state.message)
            .then((resp) => {
                ConsultService.getMessages(this.props.consultId)
                    .then((resp) => {
                        if(!this.toUnmount) {
                            this.setState({
                                chats: resp.data,
                                chatsAvailable: true,
                                errMess: '',
                                message: ''
                            })
                        }
                    }).catch((err) => {
                    if(!this.toUnmount) {
                        this.setState({
                            errMess: 'Unable to fetch details'
                        })
                    }
                })
            }).catch((err) => {
                this.setState({
                    errMess: 'There was an error sending your message'
                })
        })
    }

    componentDidMount() {
        this.toUnmount = false;
        ConsultService.getMessages(this.props.consultId)
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        chats: resp.data,
                        chatsAvailable: true,
                        errMess: ''
                    })
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Unable to fetch details'
                    })
                }
        })

        ConsultService.getConsultDetails(this.props.consultId)
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        details: resp.data,
                        detailsAvailable: true,
                        errMess: ''
                    })
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Unable to fetch details'
                    })
                }
        })

        UserService.getUserDetails()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        userDetails: resp.data,
                        userDetailsAvailable: true
                    })
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Unable to fetch details'
                    })
                }
        })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    endChat() {
        ConsultService.endConsult(this.props.consultId)
            .then((resp) => {
                ConsultService.getConsultDetails(this.props.consultId)
                    .then((resp) => {
                        if (!this.toUnmount) {
                            this.setState({
                                details: resp.data,
                                detailsAvailable: true,
                                errMess: '',
                                isModalOpen: false
                            })
                        }
                    }).catch((err) => {
                    if (!this.toUnmount) {
                        this.setState({
                            errMess: 'Unable to fetch details'
                        })
                    }
                })
            }).catch((err) => {
                this.setState({errMess: 'An error in ending your conversation'})
        })
    }

    formChatDate(date) {
        let dt = date.split("T");
        let ymd = dt[0].split("-"); // 0-> Year, 1-> Month, 2-> Date
        let time = dt[1].split("+");
        let t = time[0].split(".");
        let hrMin = t[0].split(":"); // 0-> Hr, 1-> Min

        return `${ymd[2]} ${this.months[ymd[1] - 1]} ${ymd[0]}, ${hrMin[0]}:${hrMin[1]}`;
    }

    formChats() {
        if(!this.state.chatsAvailable) {
            return (
                <div className='full-flex-span'>
                    <span className='fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }

        let i = 0;
        const chats = this.state.chats.map((chat) => {
            i++;
            let myMess = false;
            if(chat.user.username === this.state.userDetails.username)
                myMess = true;
            return(
                <div key={chat.id} style={{marginTop: `${(i===1)?'auto':'0'}`}} className={`message-div`}>
                    <div className={`message-box col-5 col-md-3 ${(myMess)? 'offset-7 offset-md-9 right': 'left'}`}>
                        {chat.message}
                        <label>
                            {this.formChatDate(chat.time)}
                        </label>
                    </div>
                </div>
            );
        })

        return (
            <div className={'chat-area fluid-container'}>
                {chats}
            </div>
        );
    }

    render() {
        if(!this.state.chatsAvailable || !this.state.detailsAvailable || !this.state.userDetailsAvailable) {
            return (
                <div className='full-flex-span'>
                    <span className='fa fa-spin fa-circle-o-notch'/>
                </div>
            );
        }
        const chats = this.formChats();
        return(
            <div className='container-fluid'>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Are you sure?</ModalHeader>
                    <ModalBody>
                        <div className='full-flex-span mt-5'>
                            <Button onClick={this.endChat} className='bg-danger mx-3'>End Chat</Button>
                            <Button onClick={this.toggleModal} className='bg-success mx-3'>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>{this.state.details.title}</h4>
                        <hr/>
                    </div>
                </div>
                <div className={'row mb-2'}>
                    <div className={'col-12'}>
                        <p>{this.state.details.details}</p>
                    </div>
                </div>
                <div className={'row mb-5'}>
                    <div className={'col-12'}>
                        <div className='chat-box'>
                            {chats}
                            <div className={'chat-form'}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row style={{marginBottom: '0', height: '100%'}}>
                                        <Col xs={9} md={10} lg={11} style={{paddingRight: 0}}>
                                            <Input type={"textarea"}
                                                   name={'message'}
                                                   placeholder={`${(this.state.details.ended)?'Conversation has already ended!': ''}`}
                                                   value={this.state.message}
                                                   onChange = {this.handleChange}
                                                   disabled={this.state.details.ended}
                                                   onKeyDown={this.handleKeyDown}
                                            />
                                        </Col>
                                        <Col xs={3} md={2} lg={1} style={{paddingLeft: 0}}>
                                            <Button disabled={this.state.details.ended} type={'submit'}>
                                                Send
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className={'col-12 d-flex justify-content-end'}>
                        <button onClick={this.toggleModal} className='btn btn-danger' disabled={this.state.details.ended}>
                            End Chat
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function Chat(props) {
    let {consultId} = useParams();
    return(
        <OnlineChat consultId={consultId} history={props.history} url={props.url}/>
    );
}

export default withRouter(Chat);