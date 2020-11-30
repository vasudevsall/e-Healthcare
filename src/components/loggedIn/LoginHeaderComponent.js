import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import UserService from '../../services/UserService';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.logoutService = this.logoutService.bind(this);
    }

    toggleNav(event) {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    logoutService() {
        UserService.logoutUser()
            .then((resp) => {
                this.props.history.push("/login");
            });
    }

    render() {
        return(
            <>
                <Navbar className='login-nav' fixed='top' expand='md' light={true}>
                    <NavbarBrand className='ml-2 ml-md-0' href='/welcome'>
                        <img src={process.env.PUBLIC_URL + '/images/logo-grey.png'} height ="50px" width="50px" alt='e' />
                        <label> - Healthcare</label>
                    </NavbarBrand>
                    <NavbarToggler className='ml-2' onClick={this.toggleNav}/>

                    <Collapse isOpen = {this.state.isNavOpen} navbar>
                        <Nav navbar className='ml-auto mr-4'>
                            <NavItem className = 'mr-5 mr-md-0'>
                                <label className='nav-link' onClick={this.logoutService}>
                                    Logout <span className="fa fa-sign-out"></span>
                                </label>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </>
        );
    }
}

export default withRouter(Header);