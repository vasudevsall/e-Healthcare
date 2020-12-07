import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ALL_APPOINTMENT = REQ_URL + 'user/appointments';
const UPCOMING = REQ_URL + 'user/appointments/upcoming';
const PREVIOUS = REQ_URL + 'user/appointments/previous';
const SCHEDULE = REQ_URL + 'user/schedule';
const DELETE = REQ_URL + 'user/appointments/delete?serial=';
const DETAILS = REQ_URL + 'user/appointments/details?id=';
const MANAGER_APPOINTMENT = REQ_URL + 'appointments';
const MANAGER_PREVIOUS = REQ_URL + 'appointments/previous';
const MANAGER_SCHEDULE = REQ_URL + 'appointments/schedule';

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

    scheduleAppointment(doc, date) {
        const data = {
            doctor_id: doc,
            date: date
        };

        const config = {
            method: 'post',
            url: SCHEDULE,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(config);
    }

    deleteAppointment(serial) {
        const config = {
            method: 'delete',
            withCredentials: true,
            url: DELETE + serial
        };

        return axios(config);
    }

    getAppointmentDetails(serial) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DETAILS + serial
        };

        return axios(config);
    }

    getAllAppointments() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: MANAGER_APPOINTMENT
        }

        return axios(config);
    }

    getAllPreviousAppointments() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: MANAGER_PREVIOUS
        }

        return axios(config);
    }

    getScheduledAppointments() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: MANAGER_SCHEDULE
        };
        return axios(config);
    }

    postNewAppointment(userPhone, doctor_id, date) {
        const data = {
            userPhone: userPhone,
            doctor_id: doctor_id,
            date: date
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: MANAGER_APPOINTMENT,
            data: data
        };

        return axios(config);
    }
}

export default new AppointmentService();