import axios from "axios";
import { setupCache } from 'axios-cache-interceptor';

const instance = axios.create({
    baseURL: "https://personal-diary-s9tr.onrender.com",
})

const axiosCache = setupCache(instance, {
    debug: console.log
})

export default axiosCache