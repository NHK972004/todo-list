// import axios from 'axios';
import axios from './axios.customize'

const createUserApi = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data)
}

const updateUserApi = () => {


}

const fetchAllUserAPI = () => {
    const URL_BackEnd = "/api/v1/user";
    return axios.get(URL_BackEnd);
}

export { createUserApi, updateUserApi, fetchAllUserAPI };