import { useLayoutEffect } from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { _lang } from "../../../config/helper"
import { closeModel, openModal } from "../../../store/actions/modalAction"
import { signInAction, signOutAction } from "../../../store/actions/userReducerAction"
import useBreadCrumb from "../../../store/hooks/useBreadCrumbs"
import { getUserInfo } from "../../apis/authApis"
import { updateUserData } from "../../apis/userApis"
import Profile from "../../pages/profile/Profile"
import ProfileEditPopUp from "../../pages/profile/ProfileEditPopUp"

const ProfileController = () => {
    const bread_crumb = useBreadCrumb()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const [initialData, setInitialData] = useState({})



    const handleValues = (method = "set", filedName, value = "") => {
        if (method == "set") {
            const currentData = { ...userData }

            currentData[filedName] = value
            if (filedName !== 'err') {
                currentData['err'] = ''
            }
            if (filedName == 'sucessMessage' && value != "") {
                setTimeout(() => {
                    handleValues(method, filedName, '')
                }, 2000)
            }
            setUserData(currentData)
            return 0;
        } else {
            return userData[filedName]
        }
    }
    useLayoutEffect(() => {
        setUserData({ ...user.data, err: '', sucessMessage: '' })
        setInitialData({ ...user.data, err: '', sucessMessage: '' })
    }, [])
    
    const updateProfile = async (changedField="",changedFieldValue) => {
        const passData = { ...userData }
        passData['user_id'] = passData['_id']
        setLoading(true)
        delete passData._id
        delete passData.err
        delete passData.createdAt
        delete passData.updatedAt
        delete passData.email
        delete passData.email
        delete passData.sucessMessage
        if(changedField!=''){
            passData[changedField] = changedFieldValue
        }
        const response = await updateUserData(passData)

        if (response.status == 1) {
            const userReponseData = await getUserInfo(passData.user_id)
            dispatch(signInAction(userReponseData.data, true))
            
            setUserData({...userReponseData.data,sucessMessage: _lang(response.message),err:""})
            setInitialData(userReponseData.data)
            // handleValues('set', 'sucessMessage', _lang(response.message))

        } else {
            handleValues('set', 'err', response.data[0] ? _lang(response.data[0].msg) : _lang('something_went_wrong'))
        }
        setLoading(false)
    }
    const logOut = () => {
        dispatch(signOutAction())
    }

    const onEditBtnClick = (type = "name") => {
        dispatch(openModal(
            "CUSTOM",
            async () => {
                
       
                dispatch(closeModel())
                
            },
            type == "name" ? <ProfileEditPopUp initialValue={initialData['name']} filedName="name" onSave={updateProfile} loading={loading} title="Change your name" error={handleValues('get', 'err')} value={handleValues('get', 'name')} onChangeVal={(value) => { handleValues('set', 'name',value) }} /> : 
            <ProfileEditPopUp onSave={updateProfile} initialValue={initialData['phone_no']} filedName="phone_no" error={handleValues('get', 'err')} title="Change your Phone number" value={handleValues('get', 'phone_no')} onChangeVal={(value) => { setUserData({ ...userData, phone_no:value }) }} />
        ))
    }

    useEffect(() => {

        bread_crumb.set([
            {
                isLink: true,
                redirect: '/dashboard/' + user.data.usercode,
                label: _lang('dashboard')
            },
            {
                isLink: false,
                redirect: '',
                label: _lang('profile')
            }
        ])
    }, [])
    return (
        <>
            {Object.keys(userData).length > 0 &&
                <Profile
                    logOut={logOut}
                    onEditBtnClick={onEditBtnClick}
                    initialData={initialData}
                    handleValues={handleValues}
                    loading={loading}
                    data={userData}
                    updateProfile={updateProfile}
                />}
        </>
    )
}
export default ProfileController