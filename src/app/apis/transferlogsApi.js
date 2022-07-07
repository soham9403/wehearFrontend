import axios from "axios"
import { getHeaders } from "../../config/helper"
import apiurl from "./apiurl"
import { resetToken } from "./authApis"

export const getTransferlogsApi = async (params) => {

    return await axios({
        url: apiurl.getTransferlogs,
        method: "GET",
        headers: getHeaders(),
        params
        
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getTransferlogsApi() })
        }
        return err.response.data
    })
}

export const resetTransferlogsApi = async (data) => {

    return await axios({
        url: apiurl.resetTransferlogs,
        method: "PUT",
        headers: getHeaders(),
        data
        
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await resetTransferlogsApi(data) })
        }
        return err.response.data
    })
}