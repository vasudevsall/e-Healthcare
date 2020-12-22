import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='foot-link-div col-4 offset-1 col-sm-2'>
                        <h5>Links</h5>
                        <div><Link className='foot-link' to='/home'>Home</Link></div>
                        <div><Link className='foot-link' to='/about'>About</Link></div>
                        <div><Link className='foot-link' to='/contact'>Contact</Link></div>
                        <div><Link className='foot-link' to='/login'>Login</Link></div>
                    </div>
                    <div style={{color: 'white'}} className='col-7 col-sm-5'>
                        <h5>Address</h5>
                        <address>
                            e-Healthcare, Street-3, Mahagony Road, Sector-20, Chandigarh-133301<br/>
                            <i className="fa fa-phone fa-lg"/>{' '}+91 12345-12345<br/>
                            <i className="fa fa-envelope fa-lg"/>{' '}
                            <a style={{color: 'white'}} href="mailto:helpingpeople@gmail.com">ehealthcare@gmail.com</a>
                        </address>
                    </div>
                    <div className='col-sm-4 col-12 align-self-center'>
                        <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-mail" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;