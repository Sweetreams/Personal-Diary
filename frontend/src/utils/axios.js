import axios from "axios";
import { setupCache } from 'axios-cache-interceptor';

const instance = axios.create({
    baseURL: "http://localhost:8000",
})

const axiosCache = setupCache(instance, {
    debug: console.log
})

export default axiosCache