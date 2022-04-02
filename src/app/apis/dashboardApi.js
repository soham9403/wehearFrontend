import axios from 'axios'
import constants from '../../config/constants'
import { accessToken, getHeaders, logOut, refreshToken, userId } from '../../config/helper'
import apiurl from './apiurl'
import { resetToken } from './authApis'
const getUseranalayticInfo = async(params)=>{
    return await axios({
        url:apiurl.getUserAnalyticInfo,
        method:"GET",
        headers:getHeaders(),
        params:params
    }).then((res)=>{
        return res.data
    }).catch(async(err)=>{
        if (err.response.status === 401) {
            return await resetToken(async () => { return await getUseranalayticInfo(params) })
        }
        return err.response.data
    })
}
export default getUseranalayticInfo