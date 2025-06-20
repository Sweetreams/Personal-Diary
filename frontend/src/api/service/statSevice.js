// import { httpRequestAbort } from "../config/axiosRequestAbort"

export const statService = {

    statGet: async (signal) => {
        return await httpRequestAbort(signal).post("/stat/statisticCount")
            .then((res) => {
                return { apiType: "success", apiMessage: res.message, httpState: res.httpState }
            })
            .catch((res) => {
                console.log(res)
                return { apiType: "error", apiMessage: res.message.errorMessage, httpState: res.httpState }
            })
    }
}