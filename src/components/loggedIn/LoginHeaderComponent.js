import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import UserService from '../../services/UserService';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: true,
            dropDownOpen: false,
            username: ''
        }
        this.logoutService = this.logoutService.bind(this);
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    componentDidMount() {
        UserService.getUserDetails()
            .then((resp) => {
                this.setState({
                    username: resp.data.username
                });
            }).catch((err) => {
               UserService.logoutUser()
                .then((resp) => {
                    this.props.history.push("/login");
                }).catch((error)=> {
                    this.props.history.push("/login");
                });
            });
    }

    logoutService() {
        UserService.logoutUser()
            .then((resp) => {
                this.props.history.push("/login");
            });
    }

    toggleSideBar(event) {
        if(this.state.isSideBarOpen) {
            document.getElementById('sidebar').classList.remove('is-active');
            this.setState({isSideBarOpen: false});
        } else {
            document.getElementById('sidebar').classList.add('is-active');
            this.setState({isSideBarOpen: true});
        }
    }

    toggleDropdown(event) {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen
        });
    }

    render() {
        return(
            <>
                <Navbar className='login-nav' fixed='top' light={true}>
                    <button className='sidebar-toggler' onClick={this.toggleSideBar}>
                        <div class={`hamburger ${(this.state.isSideBarOpen)?'is-active':''}`}>
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                        </div>
                    </button>
                    <NavbarBrand className='ml-2 ml-md-5' href='/welcome'>
                        <img src={process.env.PUBLIC_URL + '/images/logo-grey.png'} height ="50px" width="50px" alt='e' />
                        <label> - Healthcare</label>
                    </NavbarBrand>

                    <Nav navbar className='ml-auto mr-1'>
                        <NavItem className = 'mr-0'>
                            <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggleDropdown}>
                                <DropdownToggle caret>
                                    <span className='fa fa-user-circle fa-lg'></span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        {this.state.username}
                                    </DropdownItem>
                                    <DropdownItem onClick={this.logoutService}>
                                        Logout <span className="fa fa-sign-out"></span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                </Navbar>
            </>
        );
    }
}

export default withRouter(Header);