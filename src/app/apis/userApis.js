import axios from 'axios'
import constants from '../../config/constants'
import { accessToken, getHeaders, logOut, refreshToken, userId } from '../../config/helper'
import apiurl from './apiurl'
import { resetToken } from './authApis'
export const updateUserData = async (payload) => {

    return await axios({
        url: apiurl.updateUser,
        method: "PUT",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await updateUserData(payload) })
        }
        return err.response.data
    })
}

export const createUserApi = async (payload) => {

    return await axios({
        url: apiurl.createUser,
        method: "POST",
        headers: getHeaders(),
        data: payload
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await createUserApi(payload) })
        }
        return err.response.data
    })
}


export const getUserCountApi = async (params) => {

    return await axios({
        url: apiurl.get_user_count,
        method: "GET",
        headers: getHeaders(),
        params: params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getUserCountApi(params) })
        }
        return err.response.data
    })
}


export const getUserListApi = async (params) => {

    return await axios({
        url: apiurl.userlist,
        method: "GET",
        headers: getHeaders(),
        params: params
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getUserListApi(params) })
        }
        return err.response.data
    })
}


export const verifyUserApi = async (user_id) => {

    return await axios({
        url: apiurl.verifyUser,
        method: "PUT",
        headers: getHeaders(),
        data: {
            user_id:user_id
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await verifyUserApi(user_id) })
        }
        return err.response.data
    })
}

export const deleteUserAPi = async (user_id) => {

    return await axios({
        url: apiurl.deleteuser,
        method: "DELETE",
        headers: getHeaders(),
        data: {
            user_id:user_id
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await deleteUserAPi(user_id) })
        }
        return err.response.data
    })
}