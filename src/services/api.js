import axios from "axios";

const customAxios = axios.create({

    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
    }
})

export default customAxios;