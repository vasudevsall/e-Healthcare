import axios from 'axios';
import qs from 'qs';
import {REQ_URL} from '../constants/Constrants';

const USER_REG_URL = REQ_URL + "register";
const USER_LOGIN_URL = REQ_URL + "login";
const USER_VERIFICAION_URL = REQ_URL + "login-verify";
const USER_LOGOUT = REQ_URL + "logout";
const USER_DETAILS = REQ_URL + "login-success";

class UserService {

    registerUser() {
        return USER_REG_URL;
    }

    loginUser(username, password) {

        const data = qs.stringify({
            username: username,
            password: password
        });

        const config = {
            method: 'post',
            url: USER_LOGIN_URL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        return axios(config);

    }

    verifyLogin() {
        const config = {
            method: 'get',
            url: USER_VERIFICAION_URL,
            withCredentials: true
        }
        return axios(config);
    }

    logoutUser() {
        const config = {
            method: 'get',
            url: USER_LOGOUT,
            withCredentials: true
        }

        return axios(config);
    }

    getUserDetails() {
        const config = {
            method: 'get',
            url: USER_DETAILS,
            withCredentials: true
        }

        return axios(config);
    }
}

export default new UserService();