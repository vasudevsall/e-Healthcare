import axios from "axios";
import {REQ_URL} from "../constants/Constrants";

const FEEDBACK = REQ_URL + 'feedback';

class FeedbackService {

    postFeedback(name, phone, email, feedback) {
        const data = {
            name: name,
            phone: phone,
            email: email,
            feedback: feedback
        }

        const config = {
            method: 'post',
            withCredentials: true,
            url: FEEDBACK,
            data: data
        }

        return axios(config);
    }
}

export default new FeedbackService();