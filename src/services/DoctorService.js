import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const DOCTOR_DETAILS = REQ_URL + 'manage/doctor/details'

class DoctorService {

    getDoctorDetails(docId) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DOCTOR_DETAILS + '?id=' + docId
        };

        return axios(config);
    }

}

export default new DoctorService();