import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Footer from "./FooterComponent";

class About extends Component {

    render() {
        return (
            <>
                <div className='home-head'>
                    <div className='back-img'
                         style={{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/about.jpg"}')`,
                         backgroundPosition: '50% 50%'}}>
                    </div>

                    <div style={{backgroundColor: 'rgba(22,105,122, 0.4)'}} className='home-overlay'>
                        <h1>About Us</h1>
                    </div>
                </div>
                <div className='home-body'>
                    <div className={'container'}>
                        <div className={'row mb-5'}>
                            <div className={'col-12'}>
                                <h3>How we started?</h3>
                                <p className={'text-justify'}>
                                    Some time back, we decided to make a website that could increase modernisation of medicine in our country. We wanted the smart hospital system to reach at every corner of the remotest places in the nation. We wanted to make the process easy and accessible. This inspired us to take an initiative for this project.  Our main aim is to target people with lesser facilities and helping to bring them on the same level just like anybody else.  We hope this page helps to transform lives and we continue to excel and help people just like that.
                                </p>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <h3>Our Vision And Mission</h3>
                                <p className={'text-justify'}>
                                    The vision was to make medication easy! Our website here establishes a clear line of communication between doctors and the patients. Patients can always communicate with their doctors on the dashboard. Thus making the costor-patient communication effective. It accurately analyzes usage of hospital resources, including laboratory equipments, bed occupation ratio, administration, medicies, etc. This helps in proper mangement of hospital resources.
                                    Without proper authorization, on the dashboard from admin, no one can use hospital equipments. Thus it is protected and super safe for use! <br/> <br/>
                                    Our one and the only mission is to help people. This system keeps track of your medicine routines, your dosage, your requirements and helps set appointments with the doctors, keeping in mind your privacy. It makes the most out of technology without even making the users spend a single penny out of their pockets!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            <Footer/>
        </>
        );
    }
}

export default withRouter(About);