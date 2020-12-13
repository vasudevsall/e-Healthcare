import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const COMPLETE_DETAILS = REQ_URL + 'doctor/details'
const UPCOMING_APPOINTMENTS = REQ_URL + 'doctor/appointments/upcoming';
const PREVIOUS_APPOINTMENTS = REQ_URL + 'doctor/appointments/previous';

class DocService {

    getDoctorDetails() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: COMPLETE_DETAILS
        };

        return axios(config);
    }

    getUpcomingAppointments() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: UPCOMING_APPOINTMENTS
        };

        return axios(config);
    }

    getPreviousAppointments() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: PREVIOUS_APPOINTMENTS
        };

        return axios(config);
    }
}

export default new DocService();