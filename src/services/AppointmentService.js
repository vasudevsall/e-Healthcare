import axios from 'axios';
import qs from 'qs';
import {REQ_URL} from '../constants/Constrants';

const ALL_APPOINTMENT = REQ_URL + 'user/appointments';
const UPCOMING = REQ_URL + 'user/appointments/upcoming';
const PREVIOUS = REQ_URL + 'user/appointments/previous';
const SCHEDULE = REQ_URL + 'user/schedule';

class AppointmentService {

    getAppointments() {
        const config = {
            method: 'get',
            url: ALL_APPOINTMENT,
            withCredentials: true,
        };

        return axios(config);
    }

    getUpcomingAppointments() {
        const config = {
            method: 'get',
            url: UPCOMING,
            withCredentials: true
        };

        return axios(config);
    }

    getPreviousAppointments() {
        const config = {
            method: 'get',
            url: PREVIOUS,
            withCredentials: true
        }

        return axios(config);
    }
}

export default new AppointmentService();