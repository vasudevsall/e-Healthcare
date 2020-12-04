import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const PRESCRIPTION = REQ_URL + 'user/prescription';
const SEARCH_MEDICINE = REQ_URL + 'medicine/search?name=';
const ORDER_MED = REQ_URL + 'medicine/order';

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

    postMedicineOrder(medId, quantity, address) {
        const data = {
            "medId": medId,
            "quantity": quantity,
            "address": address
        }
        const config = {
            method: 'post',
            withCredentials: true,
            url: ORDER_MED,
            data: data
        }

        return axios(config);
    }

    getMedicneOrder() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ORDER_MED
        }

        return axios(config);
    }

    delOrder(id) {
        const config = {
            method: 'delete',
            withCredentials: true,
            url: ORDER_MED + '?id=' + id
        };

        return axios(config);
    }

}

export default new PharmacyService();