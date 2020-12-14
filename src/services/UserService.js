import axios from 'axios';
import qs from 'qs';
import {REQ_URL} from '../constants/Constrants';

const USER_REG_URL = REQ_URL + "register";
const USER_LOGIN_URL = REQ_URL + "login";
const USER_VERIFICAION_URL = REQ_URL + "login-verify";
const USER_LOGOUT = REQ_URL + "logout";
const USER_DETAILS = REQ_URL + "login-success";
const COMPLETE_DETAILS = REQ_URL + "user/details";
const USER_UPDATE = REQ_URL + 'update';
const USER_UPDATE_PASSWORD = REQ_URL + 'update/password';

class UserService {

    registerUser(username, password, phoneNumber, firstName, lastName, gender, dateOfBirth, email, blood) {
        const data = {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dateOfBirth: dateOfBirth,
            email: email,
            blood: blood
        };

        const config = {
            method: 'post',
            url: USER_REG_URL,
            data: data
        }

        return axios(config);
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

    getCompleteUserDetails() {
        const config = {
            method: 'get',
            url: COMPLETE_DETAILS,
            withCredentials: true
        };

        return axios(config);
    }

    updateUserDetails(username, password, firstName, lastName, phoneNumber, email, blood, gender, dateOfBirth) {
        const data = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            gender: gender,
            dateOfBirth: dateOfBirth,
            email: email,
            blood: blood
        };

        const config = {
            method: 'put',
            url: USER_UPDATE,
            withCredentials: true,
            data: data
        };

        return axios(config);
    }

    updatePassword(old, password) {
        const data = {
            old: old,
            password: password
        };

        const config = {
            method: 'put',
            withCredentials: true,
            url: USER_UPDATE_PASSWORD,
            data: data
        };

        return axios(config);
    }
}

export default new UserService();