import axios from "axios"

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BACKENDURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

httpRequest.interceptors.request.use(
    (config) => { return config },
    (error) => { return error }
)

httpRequest.interceptors.response.use(
    (config) => { return config.data },
    (error) => { return Promise.reject(error.response.data) }
)