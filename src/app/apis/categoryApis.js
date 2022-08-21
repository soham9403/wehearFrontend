import axios from "axios"
import { getHeaders } from "../../config/helper"
import apiurl from "./apiurl"
import { resetToken } from "./authApis"

export const getcategoryListApi = async () => {

    return await axios({
        url: apiurl.categoryGet,
        method: "GET",
        headers: getHeaders(),
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getcategoryListApi() })
        }
        return err.response.data
    })
}

export const deleteCategoryAPi = async (id) => {

    return await axios({
        url: apiurl.categoryDelete,
        method: "DELETE",
        headers: getHeaders(),
        data: {
            id: id
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await deleteCategoryAPi(id) })
        }
        return err.response.data
    })
}

export const createCategoryApi = async (payload) => {

    return await axios({
        url: apiurl.categoryAdd,
        method: "POST",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await createCategoryApi(payload) })
        }
        return err.response.data
    })
}


export const updateCategoryApi = async (payload) => {

    return await axios({
        url: apiurl.categoryUpdate,
        method: "put",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await updateCategoryApi(payload) })
        }
        return err.response.data
    })
}
