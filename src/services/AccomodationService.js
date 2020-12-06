import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ACCOMODATIONS = REQ_URL + 'manage/accomodation';

class AccomodationService {

    getAccomodationInformatin() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ACCOMODATIONS
        };

        return axios(config);
    }
}

export default new AccomodationService();