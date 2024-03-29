import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import constants from "../../../config/constants"
import { getKeyByValue, isEmail, isValidGST, _lang } from "../../../config/helper"

import { createUserApi, getUserListApi, updateUserData } from "../../apis/userApis"
import CreateAndUpdateUser from "../../pages/user/CreateAndUpdateUser"
import { closeModel } from '../../../store/actions/modalAction'
const CreateAndUpdateUserController = (props) => {

    const { user } = useSelector((state) => state)

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        phone_no: '',
        password: '',
        user_id: '',
        role: '',
        company_name: '',
        gst_no: '',
        territory: '',
        parent_id: user.data.role == constants.user_role.DESTRIBUTOR_ROLE || user.data.role == constants.user_role.RETELLER_ROLE ? user.data._id : '',
        err: ''
    })

    const [loading, setLoading] = useState(false)
    const [calledFromUpdate, setCalledFromUpdate] = useState(false)
    const { modal } = useSelector((state) => state)
    const dispatch = useDispatch()




    const handleValues = (method, field, value) => {
        const temp = { ...inputs }

        if (method == 'get') {
            return inputs[field]
        }
        if (typeof (field) == 'object') {
            for (let i = 0; i < field.length; i++) {
                temp[field[i]] = value[i]
            }
        } else {
            temp[field] = value
        }
        if (field != 'err') {
            temp['err'] = ''
        }
        setInputs(temp)
    }

    const validate = () => {
        if (inputs.name == "") {
            handleValues('set', 'err', _lang('name_required'))
            return 0
        }
        if (inputs.email == "") {
            handleValues('set', 'err', _lang('email_required'))
            return 0
        } else if (!isEmail(inputs.email)) {
            handleValues('set', 'err', _lang('unvalid_email'))
            return 0
        }
        if (inputs.phone_no == "") {
            handleValues('set', 'err', _lang('phone_required'))
            return 0
        }
        if (inputs.password == "" && !calledFromUpdate) {
            handleValues('set', 'err', _lang('password_required'))
            return 0
        }
        if (inputs.role == null || inputs.role == '') {
            handleValues('set', 'err', _lang('role_required'))
            return 0
        }
        if (inputs.role.index == constants.user_role.DESTRIBUTOR_ROLE || inputs.role.index == constants.user_role.RETELLER_ROLE) {
            if (inputs.company_name == "") {
                handleValues('set', 'err', _lang('company_name_required'))
                return 0
            }
            if (inputs.gst_no == "") {
                handleValues('set', 'err', _lang('gst_no_required'))
                return 0
            }
            if (!isValidGST(inputs.gst_no)) {
                handleValues('set', 'err', _lang('invalid_gst_no'))
                return 0
            }
        }


        if (inputs.role.index == constants.user_role.DESTRIBUTOR_ROLE && inputs.territory == '') {
            handleValues('set', 'err', _lang('territory_required'))
            return 0
        }

        if (inputs.role.index == constants.user_role.RETELLER_ROLE && (!inputs.parent_id || inputs.parent_id._id == "")) {
            handleValues('set', 'err', _lang('destributor_required'))
            return 0
        }
        return 1
    }

    const creatUser = async () => {
        if (validate()) {
            setLoading(true)
            const temp = { ...inputs }
            delete temp['err']
            delete temp['user_id']
            const role = inputs.role.index
            temp['role'] = role

            const response = await createUserApi(temp)

            if (response.status === 1) {
                await modal.onAction()
                dispatch(closeModel())

            } else {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
            setLoading(false)
        } else {
            document.getElementById('scrollable_form').scrollTo({ top: 0, behavior: "smooth" })
        }


    }

    const updateUser = async () => {
        if (validate()) {
            setLoading(true)
            const temp = { ...inputs }
            delete temp['err']
            const role = inputs.role.index
            temp['role'] = role

            const response = await updateUserData(temp)

            if (response.status === 1) {
                await modal.onAction()
                dispatch(closeModel())

            } else {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
            setLoading(false)
        }


    }

    useEffect(() => {
        if (modal.defaultData && Object.keys(modal.defaultData).length > 0) {
            setCalledFromUpdate(true)
            const data = modal.defaultData

            handleValues('set',
                ['name', 'email', 'user_id', 'phone_no', 'role', 'parent_id', 'territory', 'company_name', 'gst_no'],
                [
                    data.name,
                    data.email,
                    data._id,
                    data.phone_no,
                    { label: getKeyByValue(constants.user_role, data.role), index: data.role },
                    data.parent_id,
                    data.territory,
                    data.company_name,
                    data.gst_no
                ]
            )
        }
    }, [])

    const fetchUsers = async (params) => {

        if (user.data.role == constants.user_role.SUPER_ADMIN || user.data.role == constants.user_role.ADMIN || user.data.role == constants.user_role.PRODUCT_MANAGER) {

            let role = constants.user_role.DESTRIBUTOR_ROLE

            // if (inputs.role && inputs.role.index == constants.user_role.BUSINESS_EXECUTIVE)
            //     return await getUserListApi({ ...params, usercode: user.data.usercode, parent: true, verified: true })
            // else
                return await getUserListApi({ ...params, usercode: user.data.usercode, role, verified: true })
        }

    }
    return (
        <>
            <CreateAndUpdateUser
                fetchUsers={fetchUsers}
                loading={loading}
                updateUser={updateUser}
                calledFromUpdate={calledFromUpdate}
                creatUser={creatUser}

                handleValues={handleValues}
            />
        </>
    )
}
export default CreateAndUpdateUserController