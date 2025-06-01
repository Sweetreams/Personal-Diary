import { httpRequest } from "../config/axiosRequest"

const postService = {
    getPostsInfo: async () => {
        return await httpRequest.get("/post/getPostsInfo")
            .then((res) => {
                return res;
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message, httpState: res.httpState }
            })
    },

    searchPost: async (data) => {
        return await httpRequest.post(`/post/searchPost`, data)
            .then((res) => {
                return res;
            })
            .catch((res) => {
                return { apiType: "error", apiMessage: res.message, httpState: res.httpState }
            })
    }
}

export default postService