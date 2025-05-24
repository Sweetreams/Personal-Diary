import { httpRequest } from "../config/axiosRequest"

export const mailService = {
    sendMail: async (data) => {
        return await httpRequest.post("/mail/sendMail", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    },
    checkMail: async (data) => {
        return await httpRequest.post("/mail/checkMail", data)
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    }
}