import axios from "axios";
import {REQ_URL} from '../constants/Constrants';

const GET_STOCK = REQ_URL + 'manage/stock';
const GET_ALL = REQ_URL + 'manage/stock/all';
const FIND = REQ_URL + 'manage/stock/find';
const FIND_NAME = REQ_URL + 'manage/stock/findByName'

class StockService {

    getAllInStock() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: GET_STOCK
        };

        return axios(config);
    }

    getAll() {
        const config = {
            method: 'get',
            withCredentials: true,
            url: GET_ALL
        };

        return axios(config);
    }

    findStockById(id) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: FIND + '?id=' + id
        };

        return axios(config);
    }

    addItem(name, manufacturer, category, salt) {
        const data = {
            name: name,
            manufacturer: manufacturer,
            category: category,
            salt: salt
        }

        const config = {
            method: 'post',
            withCredentials: true,
            url: GET_ALL,
            data: data
        }

        return axios(config);
    }

    addSupply(medId, batch, manufacture, expire, price, quantity) {
        const data = {
            medId: medId,
            batch: batch,
            manufacture: manufacture,
            expire: expire,
            price: price,
            quantity: quantity
        }

        const config = {
            method: 'post',
            withCredentials: true,
            url: GET_STOCK,
            data: data
        }

        return axios(config);
    }

    searchItemByName(name) {
        const config = {
            method: 'get',
            withCredentials: true,
            url: FIND_NAME + '?name='+name
        };

        return axios(config);
    }
}

export default new StockService();