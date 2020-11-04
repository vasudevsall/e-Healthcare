import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(event) {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {

        return(
            <>
                <Navbar fixed='top' expand='md' light={true}>
                        <NavbarBrand className='ml-2 ml-md-0' href='/'>
                            <img src={process.env.PUBLIC_URL + '/images/logo.png'} height ="50px" width="50px" alt='e' />
                            <label> - Healthcare</label>
                        </NavbarBrand>
                        <NavbarToggler className='ml-2' onClick={this.toggleNav}/>

                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                            <Nav navbar className='ml-auto mr-4'>
                                <NavItem className='mr-5'>
                                    <NavLink className='nav-link' to='/home'>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem className='mr-5'>
                                    <NavLink className='nav-link' to='/about'>
                                        About
                                    </NavLink>
                                </NavItem>
                                <NavItem className='mr-5'>
                                    <NavLink className='nav-link' to='/contact'>
                                        Contact
                                    </NavLink>
                                </NavItem>
                                <NavItem className = 'mr-5 mr-md-0'>
                                    <NavLink className='nav-link' to='/login'>
                                        Login
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                </Navbar>
            </>
        );
    }
}

export default Header;