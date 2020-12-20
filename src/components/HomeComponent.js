import React from 'react';
import Footer from './FooterComponent';

function Home(props){
    return (
        <>
            <div className='home-head'>
                <div className = 'back-img' 
                    style={{backgroundImage: `url('${process.env.PUBLIC_URL + "/images/homepage.jpg"}')`}}>
                </div>

                <div className='home-overlay'>
                    <h1>Complete Digital Healthcare</h1>
                </div>
            </div>
            <div className='home-body'>
                <div className='container'>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <h3>Managing Healthcare system, now made easy</h3>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-6 col-12'>
                            <div class="media">
                                <img src={process.env.PUBLIC_URL + "/images/hospital.svg"}
                                    alt="Hospital" className="d-flex mr-3 img-thumbnail align-self-center"
                                />
                                <div class="media-body d-flex d-md-block align-self-center">
                                    <h5 class="mt-0">Hospital Management</h5>
                                    <p class="d-none d-md-block">
                                        <ul>
                                            <li>Management of all Hospital Resources</li>
                                            <li>Analysis of usage of Hospital Resources</li>
                                            <li>Management of patients, doctors and staff</li>
                                            <li>Paperless Management</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-12'>
                            <div class="media">
                                <img src={process.env.PUBLIC_URL + "/images/lab.svg"}
                                    alt="Lab" className="d-flex mr-3 img-thumbnail align-self-center"
                                />
                                <div class="media-body d-flex d-md-block align-self-center">
                                    <h5 class="mt-0">Laboratory Management</h5>
                                    <p class="d-none d-md-block">
                                        <ul>
                                            <li>Management of all equipment and samples</li>
                                            <li>Booking of online sample collection</li>
                                            <li>Access reports anytime, anywhere</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col-md-6 col-12'>
                            <div class="media">
                                <img src={process.env.PUBLIC_URL + "/images/consultation.svg"}
                                    alt="Lab" className="d-flex mr-3 img-thumbnail align-self-center"
                                />
                                <div class="media-body d-flex d-md-block align-self-center">
                                    <h5 class="mt-0">Clinic Management</h5>
                                    <p class="d-none d-md-block">
                                        <ul>
                                            <li>Management of all appointments online</li>
                                            <li>Scheduling online appointments</li>
                                            <li>Track all treatments and patient details</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-6 col-12'>
                            <div class="media">
                                <img src={process.env.PUBLIC_URL + "/images/online-consult.svg"}
                                    alt="Lab" className="d-flex mr-3 img-thumbnail align-self-center"
                                />
                                <div class="media-body d-flex d-md-block align-self-center">
                                    <h5 class="mt-0">Online Consultation</h5>
                                    <p class="d-none d-md-block">
                                        <ul>
                                            <li>Consult a doctor online</li>
                                            <li>24 x 7 online consultation services</li>
                                            <li>Get instant medication</li>
                                            <li>Schedule offline appointment if required</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-100 width-100 mb-4'></div>

                    <div className='row mb-4'>
                        <div className='col-12'>
                            <h3>Key Features</h3>
                        </div>
                    </div>

                    <div className='row features mb-5'>
                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='col-1'><span className='fa fa-calendar fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Appointment Management</label></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-1 col-1'><span className='fa fa-line-chart fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Detailed Analysis</label></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-xl-1 col-1'><span className='fa fa-flask fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Laboratory Management</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-1 offset-xl-0 col-1'><span className='fa fa-medkit fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Patient Management</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-0 offset-xl-1 col-1'><span className='fa fa-desktop fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Interactive Dashboard</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-1 offset-xl-1 col-1'><span className='fa fa-comments fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Online Consultation</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-0 offset-xl-0 col-1'><span className='fa fa-floppy-o fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Completely Paperless</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-1 offset-xl-1 col-1'><span className='fa fa-wifi fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Access anywhere</label></div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-4 mb-5 d-block d-sm-none d-xl-block'>
                            <div className='container-fluid'>
                                <div className='row feature-row'>
                                    <div className='offset-sm-1 offset-xl-1 col-1'><span className='fa fa-lock fa-2x'></span></div>
                                    <div className='offset-1 col'><label> Secure System</label></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='w-100 width-100 mb-4'></div> */}
                </div>
            </div>

            <Footer/>
        </>  
    );
}

export default Home;