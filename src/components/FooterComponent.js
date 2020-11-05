import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='offset-md-2 col-md-4 col-12 foot-link-div'>
                        <h5>Links</h5>
                        <div><Link className='foot-link' to='/home'>Home</Link></div>
                        <div><Link className='foot-link' to='/about'>About</Link></div>
                        <div><Link className='foot-link' to='/contact'>Contact</Link></div>
                        <div><Link className='foot-link' to='/login'>Login</Link></div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <h2 className='text-center mb-4'>e-Healthcare</h2>
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