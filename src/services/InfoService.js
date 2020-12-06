import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ALL_SPECIALITY = REQ_URL + "info/speciality";
const DOCTORS_SPECIALITY = REQ_URL + "info/speciality/";
const DOC_SCHEDULE = REQ_URL + "info/doctor/schedule?id=";
const ALL_DOC = REQ_URL + "info/doctors";
const ONE_DOC = REQ_URL + "info/doctor";

class InfoService {

    getAllSpeciality() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_SPECIALITY
        };

        return axios(config);
    }

    getSpecialistDoctors(speciality) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DOCTORS_SPECIALITY + speciality
        };

        return axios(config);
    }

    getDoctorSchedule(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DOC_SCHEDULE + id
        };

        return axios(config);
    }

    getAllDoctors() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_DOC
        };

        return axios(config);
    }

    getDoctorByName(first, last) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ONE_DOC + '?first=' + first + '&last=' + last
        }

        return axios(config);
    }
}

export default new InfoService();