// import axios from 'axios';
import axios from './axios.customize'

const createUserApi = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data)
}

const updateUserApi = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = { _id, fullName, phone }
    return axios.put(URL_BACKEND, data)
}

const fetchAllUserAPI = () => {
    const URL_BackEnd = "/api/v1/user";
    return axios.get(URL_BackEnd);
}

const deleteUserApi = (_id) => {
    const URL_BackEnd = `/api/v1/user/${_id}`;
    return axios.delete(URL_BackEnd);
}

const handleUploadFile = (file, folder) => {
    let config = {
        headers: {
            "upload-type": folder,
            'Content-Type': 'multipart/form-data',
        }
    }
    const URL_BackEnd = "/api/v1/file/upload";

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)

    return axios.post(URL_BackEnd, bodyFormData, config);
}

const updateUserAvatarApi = (avatar, _id, fullName, phone) => {
    const URL_BackEnd = "/api/v1/user";
    const data = { _id, avatar, fullName, phone }
    return axios.put(URL_BackEnd, data);
}

export { createUserApi, updateUserApi, fetchAllUserAPI, deleteUserApi, handleUploadFile, updateUserAvatarApi };