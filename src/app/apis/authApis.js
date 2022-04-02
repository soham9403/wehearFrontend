import axios from 'axios'
import constants from '../../config/constants'
import { accessToken, getHeaders, logOut, refreshToken, userId } from '../../config/helper'
import apiurl from './apiurl'
export const getUserInfo = async (user_code) => {

    return await axios({
        url: apiurl.get_user_by_code,
        method: "GET",
        headers: getHeaders(),
        params: {
            user_code: user_code,
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getUserInfo(user_code) })
        }
        return err.response.data
    })
}
export const getDestributorList = async () => {
    return await axios({
        url: apiurl.destributorList,
        method: "GET",
        params: {
            all: true,
        }
    }).then(res => {
        return res.data
    }).catch(async (err) => {
        if (err.response.status === 401) {
          return  await resetToken(async () => { await getDestributorList() })
        }
        return err.response.data
    })
}
export const signIn = async (email, pass) => {
    return await axios({
        url: apiurl.signIn,
        method: "post",
        data: {
            email: email,
            password: pass
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data
    })
}

export const signUp = async (payload) => {
    return await axios({
        url: apiurl.signUp,
        method: "post",
        data: payload
    }).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data
    })
}


export const sendOtp = async (unique_key) => {
    return await axios({
        url: apiurl.sendotp,
        method: "post",
        data: {
            unique_key
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data
    })
}

export const verifyOtp = async (user_id, otp) => {
    return await axios({
        url: apiurl.verifyotp,
        method: "post",
        data: {
            user_id,
            otp
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data
    })
}

export const updatePassword = async (user_id, password, confirm_password) => {
    return await axios({
        url: apiurl.changepassword,
        method: "put",
        data: {
            user_id,
            password,
            confirm_password
        }
    }).then(res => {
        return res.data
    }).catch(err => {
        return err.response.data
    })
}
export const resetToken = async (callBack = async () => { }) => {

    return await axios({
        url: apiurl.reset_token,
        method: "post",
        headers: getHeaders(),
        data: {
            refreshToken: refreshToken.get(),
        }
    }).then(async (res) => {
        accessToken.set(res.data.data.accessToken)
        refreshToken.set(res.data.data.refreshToken)

        return await callBack()
    }).catch(err => {
        if (err.response.status === 401) {
            logOut()
            window.location.reload()
        }
        return err.response.data
    })
}