import axios from "axios"
import { getHeaders } from "../../config/helper"
import apiurl from "./apiurl"
import { resetToken } from "./authApis"

export const createLeadApi = async (data) => {

    return await axios({
        url: apiurl.lead,
        method: "POST",
        headers: getHeaders(),
        data:data
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await createLeadApi(data) })
        }
        return err.response.data
    })
}

export const getLeadDataApi = async (data) => {

    return await axios({
        url: apiurl.lead,
        method: "GET",
        headers: getHeaders(),
        params:data
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getLeadDataApi(data) })
        }
        return err.response.data
    })
}

export const getLeadCountsApi = async (data) => {

    return await axios({
        url: apiurl.leadcount,
        method: "GET",
        headers: getHeaders(),
        params:data
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getLeadCountsApi(data) })
        }
        return err.response.data
    })
}

export const updateLeadApi = async (data) => {

    return await axios({
        url: apiurl.lead,
        method: "PATCH",
        headers: getHeaders(),
        data
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await updateLeadApi(data) })
        }
        return err.response.data
    })
}

export const forwardLeadApi = async (data) => {

    return await axios({
        url: apiurl.lead,
        method: "PUT",
        headers: getHeaders(),
        data
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await forwardLeadApi(data) })
        }
        return err.response.data
    })
}