import React, { Component } from 'react';
import {useParams, withRouter} from 'react-router-dom';
import AccomodationService from '../../../services/AccomodationService'; 

class BillGeneration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            bookDetailsAvailable: false,
            errMess: ''
        }
    }

    componentDidMount() {
        // this.toUnmount = false;
        // AccomodationService.dischargePatient(this.props.roomId)
        // .then((resp) => {
        //     AccomodationService.getDetailsById(this.props.roomId)
        //     .then((response) => {
        //         if(!this.toUnmount) {
        //             this.setState({
        //                 bookDetails: response.data,
        //                 bookDetailsAvailable: true
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         if(!this.toUnmount) {
        //             this.setState({
        //                 errMess: 'Error getting bill details'
        //             })
        //         }
        //     })
        // }).catch((err) => {
        //     this.setState({
        //         errMess: 'Error discharging the patient'
        //     })
        // })
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    render() {
        return(
            <div className='container bill'>
                <div className='row'>
                    <div className='icon col-12 d-flex justify-content-center align-items-center'>
                        <img src={process.env.PUBLIC_URL + '/images/logo.png'} height='70px' width='70px' alt='e'/>
                        <label>-HealthCare</label>
                    </div>
                </div>
            </div>
        );
    }
}

function Bill(props) {
    let { roomId } = useParams();

    return(
        <BillGeneration roomId={roomId} history={props.history} url={props.url} />
    );
}

export default withRouter(Bill);