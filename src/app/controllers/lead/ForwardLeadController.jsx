import { useMemo } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import constants from "../../../config/constants"
import { isEmail, _lang } from "../../../config/helper"
import { closeModel } from "../../../store/actions/modalAction"
import { createLeadApi, forwardLeadApi } from "../../apis/lead.api"
import { getUserListApi } from "../../apis/userApis"
import LeadCreate from "../../pages/lead/LeadeCreate"
import LeadForward from "../../pages/lead/LeadForward"

const ForwardLeadController = ({id}) => {
    const { user, modal } = useSelector(state => state)
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        
        message: "",
        from: user.data._id,
        to: null,
        toId: null,
        err: '',
    })

    const [loading, setLoading] = useState(false)

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
      
        if (!inputs.message || inputs.message == "") {
            handleValues('set', 'err', _lang('message_required'))
            return 0
        }
        if (!inputs.to || inputs.to == "") {
            handleValues('set', 'err', _lang('to_required'))
            return 0
        }


        if (inputs.to == "child" && (!inputs.toId || inputs.toId == "")) {
            handleValues('set', 'err', _lang('select_child'))
            return 0
        }

        return 1
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true)
            const data = { ...inputs }

        
            data['to'] = data['to'].index

            if (data['to'] == 'child') {
                data['to'] = data['toId']
            }
            const response = await forwardLeadApi({...data,id})

            if (response.status === 1) {
                await modal.onAction()
                dispatch(closeModel())

            } else {
                handleValues('set', 'err', _lang(response.data[0].msg))
            }
            setLoading(false)
        }
    }

    const assignToDropDown = useMemo(() => {
        const list = [...Object.keys(constants.assignType).map(key => {
            return { label: key.replace(/_/g, ' '), index: constants.assignType[key] }
        })]
        if (user.data.role == constants.user_role.DESTRIBUTOR_ROLE || user.data.role == constants.user_role.RETELLER_ROLE) {
            list.push({ label: 'PARENT', index: 'parent' })
        }
        if (
            user.data.role == constants.user_role.ADMIN ||
            user.data.role == constants.user_role.SUPER_ADMIN ||
            user.data.role == constants.user_role.PRODUCT_MANAGER ||
            user.data.role == constants.user_role.BUSINESS_EXECUTIVE ||
            user.data.role == constants.user_role.DESTRIBUTOR_ROLE
        ) {
            list.push({ label: 'CHILD', index: 'child' })
        }
        return list
    })

    const fetchUserFun = async (params) => {

        let role = constants.user_role.DESTRIBUTOR_ROLE
        if (user.data.role == constants.user_role.SUPER_ADMIN ||
            user.data.role == constants.user_role.ADMIN ||
            user.data.role == constants.user_role.PRODUCT_MANAGER || user.data.role == constants.user_role.BUSINESS_EXECUTIVE) {
            return await getUserListApi({ ...params, usercode: user.data.usercode, child: true, verified: true })
        }
        return await getUserListApi({ ...params, usercode: user.data.usercode, role, verified: true })
    }


    return (
        <>
            <LeadForward fetchUserFun={fetchUserFun} assignToDropDown={assignToDropDown} onSubmit={onSubmit} handleValues={handleValues} loading={loading} />
        </>
    )
}
export default ForwardLeadController