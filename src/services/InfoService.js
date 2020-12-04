import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ALL_SPECIALITY = REQ_URL + "info/speciality";
const DOCTORS_SPECIALITY = REQ_URL + "info/speciality/";
const DOC_SCHEDULE = REQ_URL + "info/doctor/schedule?id=";

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
}

export default new InfoService();