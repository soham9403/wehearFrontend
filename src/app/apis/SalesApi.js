import axios from "axios"
import { getHeaders } from "../../config/helper"
import apiurl from "./apiurl"
import { resetToken } from "./authApis"

export const getSalesListApi = async (params) => {

    return await axios({
        url: apiurl.salesList,
        method: "GET",
        headers: getHeaders(),
        params:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getSalesListApi(params) })
        }
        return err.response.data
    })
}

export const transferBoxApi = async (params) => {

    return await axios({
        url: apiurl.transferBox,
        method: "PUT",
        headers: getHeaders(),
        data:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await transferBoxApi(params) })
        }
        return err.response.data
    })
}
export const transferBoxBulkApi = async (params) => {

    return await axios({
        url: apiurl.transferBoxBulk,
        method: "PUT",
        headers: getHeaders(),
        data:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await transferBoxBulkApi(params) })
        }
        return err.response.data
    })
}

export const saleBoxApi = async (params) => {

    return await axios({
        url: apiurl.saleBox,
        method: "PUT",
        headers: getHeaders(),
        data:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await saleBoxApi(params) })
        }
        return err.response.data
    })
}

export const getRangedDataApi = async(params) =>{
    return await axios({
        url: apiurl.getBoxBetweenRange,
        method: "GET",
        headers: getHeaders(),
        params:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getRangedDataApi(params) })
        }
        return err.response.data
    })
}


export const exportSalesApi = async (params) => {
    console.log("params",params)
    return await axios({
        url: apiurl.exportBox,
        method: "GET",
        headers: getHeaders(),
        params:params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await exportSalesApi(params) })
        }
        return err.response.data
    })
}