import axios from 'axios';
import {REQ_URL} from '../constants/Constrants';

const ACCOMODATIONS = REQ_URL + 'manage/accomodation';
const ROOMS = REQ_URL + 'manage/room';
const ROOM_BOOKING_HISTORY = REQ_URL + 'manage/room/booking/history';
const ROOM_ADMIT = REQ_URL + 'manage/room/checkin';
const ROOM_DISCHARGE = REQ_URL + 'manage/room/checkout';
const CURRENT_ADMITS = REQ_URL + 'manage/room/booking/current';
const ROOM_DETAILS_ID = REQ_URL + 'manage/room/booking/details';
const ICU = REQ_URL + 'manage/icu';
const ICU_BOOKING_HISTORY = REQ_URL + 'manage/icu/booking/history';
const ICU_CURRENT = REQ_URL + 'manage/icu/booking/current';
const ICU_ADMIT = REQ_URL + 'manage/icu/checkin';
const ICU_DISCHARGE = REQ_URL + 'manage/icu/checkout';
const OT = REQ_URL + 'manage/ot';
const OT_BOOKING_HISTORY = REQ_URL + 'manage/ot/booking/history';
const OT_CURRENT = REQ_URL + 'manage/ot/booking/current';
const OT_ADMIT = REQ_URL + 'manage/ot/checkin';
const OT_DISCHARGE = REQ_URL + 'manage/ot/checkout';


class AccomodationService {

    getAccomodationInformatin() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ACCOMODATIONS
        };

        return axios(config);
    }

    getAllRoomsInfo() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ROOMS
        };

        return axios(config);
    }

    getCurrentRoomBookings() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: CURRENT_ADMITS
        };

        return axios(config);
    }

    dischargePatient(id) {
        const config ={
            method: 'post',
            withCredentials: true,
            url: ROOM_DISCHARGE + '?id=' + id
        };

        return axios(config);

    }

    getDetailsById(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ROOM_DETAILS_ID + '?id=' + id
        };

        return axios(config);
    }

    getBookingHistory() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ROOM_BOOKING_HISTORY
        };

        return axios(config);
    }

    admitAPatient(roomNo, userPhone, details, docId, staffId) {
        const data = {
            roomNo: roomNo,
            userPhone: userPhone,
            details: details,
            docId: docId,
            staffId: staffId
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: ROOM_ADMIT,
            data: data
        }

        return axios(config);
    }

    getAllIcuInfo() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ICU
        }

        return axios(config);
    }

    getICUCurrent() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ICU_CURRENT
        };

        return axios(config);
    }

    getICUHistory() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: ICU_BOOKING_HISTORY
        };

        return axios(config);
    }

    admitIcu(roomNo, userPhone, details, docId, staffId) {
        const data = {
            roomNo: roomNo,
            userPhone: userPhone,
            details: details,
            docId: docId,
            staffId: staffId
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: ICU_ADMIT,
            data: data
        };

        return axios(config);
    }

    dischargeIcu(id) {
        const config = {
            method: 'post',
            withCredentials: true,
            url: ICU_DISCHARGE + '?id=' + id
        };

        return axios(config);
    }

    getAllOtInfo() {
        const config = {
            method: 'get',
            withCredentials: true,
            url:OT
        };

        return axios(config);
    }

    getOtCurrent() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: OT_CURRENT
        }

        return axios(config);
    }

    getOtHistory() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: OT_BOOKING_HISTORY
        };

        return axios(config);
    }

    admitOt(roomNo, userPhone, details, docId, staffId) {
        const data = {
            roomNo: roomNo,
            userPhone: userPhone,
            details: details,
            docId: docId,
            staffId: staffId
        };

        const config = {
            method: 'post',
            withCredentials: true,
            url: OT_ADMIT,
            data: data
        }

        return axios(config);
    }

    dischargeOt(id) {
        const config = {
            method: 'post',
            withCredentials: true,
            url: OT_DISCHARGE + '?id=' + id
        };

        return axios(config);
    }
}

export default new AccomodationService();