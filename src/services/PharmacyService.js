import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const PRESCRIPTION = REQ_URL + 'user/prescription';
const SEARCH_MEDICINE = REQ_URL + 'medicine/search?name='

class PharmacyService {

    getPrescriptions() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: PRESCRIPTION
        };


        return axios(config);
    }

    searchMedicine(name) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: SEARCH_MEDICINE + name
        };

        return axios(config);
    }

}

export default new PharmacyService();