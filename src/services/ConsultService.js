import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const CONSULT = REQ_URL + 'consult';
const HISTORY = REQ_URL + 'consult/history';
const MESSAGES = REQ_URL + 'consult/message'
const SEARCH = REQ_URL + 'consult/search';

class ConsultService {

    getConsultations() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: CONSULT
        };

        return axios(config);
    }

    getConsultationHistory() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: HISTORY
        };
        return axios(config);
    }

    postConsultation(docId, title, details) {
        const data = {
            docId: docId,
            title: title,
            details: details
        }

        const config = {
            method: 'post',
            withCredentials: true,
            url: CONSULT,
            data: data
        }

        return axios(config);
    }

    getMessages(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: MESSAGES + '?id=' + id
        }

        return axios(config);
    }

    getConsultDetails(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: SEARCH + '?id=' + id
        }

        return axios(config);
    }

    postMessage(consultId, message) {
        const data = {
            consultId: consultId,
            message: message
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: MESSAGES,
            data: data
        }

        return axios(config);
    }

    endConsult(id) {
        const config = {
            method: 'delete',
            withCredentials: true,
            url: CONSULT + '?id=' + id
        };

        return axios(config);
    }
}

export default new ConsultService();