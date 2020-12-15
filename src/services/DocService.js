import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const COMPLETE_DETAILS = REQ_URL + 'doctor/details'
const UPCOMING_APPOINTMENTS = REQ_URL + 'doctor/appointments/upcoming';
const PREVIOUS_APPOINTMENTS = REQ_URL + 'doctor/appointments/previous';
const APPOINTMENTS_DETAILS = REQ_URL + 'doctor/appointments/details';
const SCHEDULE = REQ_URL + 'doctor/schedule';

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

    postAppointments(id, prescription, test, comments) {
        const data = {
            id: id,
            prescription: prescription,
            test: test,
            comments: comments
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: APPOINTMENTS_DETAILS,
            data: data
        }

        return axios(config);
    }

    getSchedule() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: SCHEDULE
        }

        return axios(config);
    }

    postSchedule(data) {
        const config = {
            method: 'post',
            withCredentials: true,
            url: SCHEDULE,
            data: data
        }

        return axios(config);
    }
}

export default new DocService();