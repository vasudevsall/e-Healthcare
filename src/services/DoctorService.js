import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const DOCTOR_DETAILS = REQ_URL + 'manage/doctor/details';
const DOCTOR = REQ_URL+ 'manage/doctor';

class DoctorService {

    getDoctorDetails(docId) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DOCTOR_DETAILS + '?id=' + docId
        };

        return axios(config);
    }


    addNewDoctor(username, first, last, gender, phone, qualification, experience, speciality, dob) {
        const data = {
            username: username, 
            first: first,
            last: last,
            gender: gender,
            phone: phone,
            qualification: qualification,
            experience: experience,
            speciality: speciality,
            dob: dob
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: DOCTOR,
            data: data
        };

        return axios(config);
    }

}

export default new DoctorService();