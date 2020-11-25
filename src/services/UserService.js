import axios from 'axios';
import qs from 'qs';
import {REQ_URL} from '../constants/Constrants';

const USER_REG_URL = REQ_URL + "register";
const USER_LOGIN_URL = REQ_URL + "login";

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

        axios(config).then(function(response){
            console.log(response);
        });

    }
}

export default new UserService();