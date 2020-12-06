import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ALL_USERS = REQ_URL + 'manage/users';
const ALL_MANAGERS = REQ_URL + 'manage/managers';
const ALL_STAFF = REQ_URL + 'manage/staff';

class ManagerService {

    getAllUsers() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_USERS
        };

        return axios(config);
    }

    getAllManagers() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_MANAGERS
        };

        return axios(config);
    }

    getAllStaff() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ALL_STAFF
        }

        return axios(config);
    }

}

export default new ManagerService();