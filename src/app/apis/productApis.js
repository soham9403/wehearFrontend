import axios from "axios"
import { getHeaders } from "../../config/helper"
import apiurl from "./apiurl"
import { resetToken } from "./authApis"

export const getProductListApi = async () => {

    return await axios({
        url: apiurl.productGet,
        method: "GET",
        headers: getHeaders(),
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getProductListApi() })
        }
        return err.response.data
    })
}

export const deleteProductAPi = async (id) => {

    return await axios({
        url: apiurl.productDelete,
        method: "DELETE",
        headers: getHeaders(),
        data: {
            id: id
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await deleteProductAPi(id) })
        }
        return err.response.data
    })
}

export const createProductApi = async (payload) => {

    return await axios({
        url: apiurl.productAdd,
        method: "POST",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await createProductApi(payload) })
        }
        return err.response.data
    })
}


export const updateProductApi = async (payload) => {

    return await axios({
        url: apiurl.productUpdate,
        method: "put",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await updateProductApi(payload) })
        }
        return err.response.data
    })
}
