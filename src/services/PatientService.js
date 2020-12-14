import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ALL_PATIENTS = REQ_URL + 'manage/users';
const PATIENT = REQ_URL + 'manage/user';
const PATIENT_DETAILS = REQ_URL + 'manage/user/details';

class PatientService {

    getAllPatients() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_PATIENTS
        };

        return axios(config);
    }

    getPatientByName(name) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: PATIENT + "?name=" + name
        };

        return axios(config);
    }

    addNewPatient(username, first, last, phone, email, blood, gender, date) {
        const data = {
            "username": username,
            "firstName": first,
            "lastName": last,
            "phoneNumber": phone,
            "email": email,
            "blood": blood,
            "gender": gender,
            "dateOfBirth": date
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: PATIENT,
            data: data
        };

        return axios(config);
    }

    getCompleteDetails(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: PATIENT_DETAILS + '?id=' + id
        };

        return axios(config);
    }

    deleteUser(id) {
        const config ={
            method: 'delete',
            withCredentials: true,
            url: PATIENT + '?id=' + id
        };

        return axios(config);
    }
}

export default new PatientService();