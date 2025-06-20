import { httpRequest } from "../config/axiosRequest"

const userService = {

    //axiosRequest.js
    loginRequest: async (data) => {
        return await httpRequest.post("/user/loginUser", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    registrationRequest: async (data) => {
        return await httpRequest.post("/user/createUser", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    mailUserCheckRequest: async (data) => {
        return await httpRequest.post("/user/emailCheck", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    passwordRecoveryRequest: async (data) => {
        return await httpRequest.put("/user/changePasswordUser", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    changeUserRequest: async (data) => {
        return await httpRequest.put("/user/changeUser", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    deleteUserRequest: async (data) => {
        return await httpRequest.put("/user/deleteUser", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    }

    //axiosRequestAbort.js
}

export default userService