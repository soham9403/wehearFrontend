import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import constants from "../../../config/constants"
import { getKeyByValue, isEmail, isValidGST, _lang } from "../../../config/helper"
import { setdestributorListAction } from "../../../store/actions/destributorListAction"
import { getDestributorList } from "../../apis/authApis"
import { createUserApi, updateUserData } from "../../apis/userApis"
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
        destributor_id: user.data.role == constants.user_role.DESTRIBUTOR_ROLE ? user.data._id : '',
        err: ''
    })

    const [loading, setLoading] = useState(false)
    const [calledFromUpdate, setCalledFromUpdate] = useState(false)
    const { destributor, modal } = useSelector((state) => { return { destributor: state.destributor_list, modal: state.modal } })
    const dispatch = useDispatch()
    const [destributorList, setdestributorList] = useState([])

    useEffect(() => {
        (async () => {

            if (!destributor.data || destributor.data.length <= 0) {

                const response = await getDestributorList()
                if (response.status == 1) {
                    dispatch(setdestributorListAction(response.data.result))
                }
            }
        })()
    }, [])
    useEffect(() => {

        setdestributorList(destributor.data)
    }, [destributor.data])
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

        if (inputs.role.index == constants.user_role.RETELLER_ROLE && (!inputs.destributor_id || inputs.destributor_id._id == "")) {
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
            console.log(modal.defaultData)
            const data = modal.defaultData

            handleValues('set',
                ['name', 'email', 'user_id', 'phone_no', 'role', 'destributor_id', 'territory','company_name','gst_no'],
                [
                    data.name,
                    data.email,
                    data._id,
                    data.phone_no,
                    { label: getKeyByValue(constants.user_role, data.role), index: data.role },
                    data.destributor_id,
                    data.territory,
                    data.company_name,
                    data.gst_no
                ]
            )
        }
    }, [])
    return (
        <>
            <CreateAndUpdateUser
                loading={loading}
                updateUser={updateUser}
                calledFromUpdate={calledFromUpdate}
                creatUser={creatUser}
                destributorList={destributorList}
                handleValues={handleValues}
            />
        </>
    )
}
export default CreateAndUpdateUserController