import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const STAFF = REQ_URL + 'manage/staff';
const TASKS = REQ_URL + 'manage/tasks';
const DETAILS =REQ_URL + 'manage/staff/details';

class StaffService {

    getAllStaff() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: STAFF
        };

        return axios(config);
    }

    deleteStaff(id) {
        const config = {
            method: 'delete',
            withCredentials: true,
            url: STAFF + '?id=' + id
        };

        return axios(config);
    }

    registerStaff(name, address, phoneNumber, gender, birth, qualification) {
        const data = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            birth: birth,
            qualification: qualification
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: STAFF,
            data: data
        }

        return axios(config);
    }

    getAllTasks() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: TASKS
        };
        
        return axios(config);
    }

    scheduleATask(staff, task, time) {
        const data = {
            staff: staff,
            task: task,
            time: time
        }

        const config = {
            method: 'post',
            withCredentials: true,
            url: TASKS,
            data: data
        }

        return axios(config);
    }

    deleteScheduledTask(id) {
        const config = {
            method: 'delete',
            withCredentials: true,
            url: TASKS + '?id=' + id
        }

        return axios(config);
    }

    getCompleteStaffDetails(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: DETAILS + "?id=" + id
        }

        return axios(config);
    }

}

export default new StaffService();