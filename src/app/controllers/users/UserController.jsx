import { useEffect } from "react"
import { _lang } from "../../../config/helper"
import useBreadCrumb from "../../../store/hooks/useBreadCrumbs"
import { deleteUserAPi, getUserCountApi, getUserListApi, verifyUserApi } from "../../apis/userApis"
import UserDataPage from "../../pages/user/UserDataPage"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { openModal } from "../../../store/actions/modalAction"
import CreateAndUpdateUserController from "./CreateAndUpdateUserController"
const UserController = () => {

    const bread_crumb = useBreadCrumb()
    const dispatch = useDispatch()
    const params = useParams()
    const usercode = params.usercode
    const [filters, setFilters] = useState({
        search: '',
        page_no: 1,
        page_size: 10,
        role: '',
        verified: true,
        usercode: usercode
    })
    const [usercount, setUsercount] = useState([])
    const [userData, setuserData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        (async () => {
            bread_crumb.set([
                {
                    isLink: false,
                    redirect: '/users/' + usercode,
                    label: _lang('users')
                }
            ], true)
            await getUserCount(usercode)
        })()
    }, [])

    const getUserCount = async (user_id) => {
        const pass_params = {
            user_code: user_id
        }
        setLoading(true)
        const response = await getUserCountApi(pass_params)

        if (response.status == 1) {
            setUsercount(response.data)
        }

        setLoading(false)
    }
    const getUserList = async () => {
        const pass_params = { ...filters }
        setLoading(true)
        const response = await getUserListApi(pass_params)

        if (response.status == 1) {
            setuserData(response.data)
        }

        setLoading(false)
    }
    const handleFilters = (field, value) => {
        const temp = { ...filters }
        if (typeof (field) == 'object') {
            for (let i = 0; i < field.length; i++) {
                temp[field[i]] = value[i]
            }
        } else {

            temp[field] = value

        }
        setFilters(temp)
    }

    const onDeleteBtnClick = (row) => {
        dispatch(openModal(
            "DELETE",
            async () => {
                await deleteUserAPi(row._id)
                await Promise.all([
                    getUserList(usercode),
                    getUserCount(usercode)

                ])
            }
        ))
    }

    const onVerifyBtnClick = (row) => {
        dispatch(openModal(
            "VERIFY",
            async () => {
                await verifyUserApi(row._id)
                await Promise.all([
                    getUserList(usercode),
                    getUserCount(usercode)

                ])
            }
        ))
    }


    const onUpdateBtnClick = (row) => {
        
        dispatch(openModal(
            "CUSTOM_FULL_HEIGHT",
            async () => {
                await Promise.all([
                    getUserList(usercode),
                    getUserCount(usercode)

                ])
            },
            <CreateAndUpdateUserController />,
            row
        ))
    }

    const onCreateBtnClick = () => {
        dispatch(openModal(
            "CUSTOM_FULL_HEIGHT",
            async () => {

                await Promise.all([
                    getUserList(usercode),
                    getUserCount(usercode)

                ])
            },
            <CreateAndUpdateUserController />
        ))
    }

    useEffect(() => {
        (async () => {
            await getUserList(usercode)

        })()
    }, [filters])

    return (
        <UserDataPage
            onUpdateBtnClick={onUpdateBtnClick}
            onCreateBtnClick={onCreateBtnClick}
            onDeleteBtnClick={onDeleteBtnClick}
            onVerifyBtnClick={onVerifyBtnClick}
            loading={loading}
            filters={filters}
            userData={userData}
            handleFilters={handleFilters}
            usercount={usercount}
        />
    )
}
export default UserController