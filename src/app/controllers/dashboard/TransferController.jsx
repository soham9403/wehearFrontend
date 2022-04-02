import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import constants from "../../../config/constants"
import { isAllowedPhone, isEmail, _lang } from "../../../config/helper"
import { setdestributorListAction } from "../../../store/actions/destributorListAction"
import { closeModel } from "../../../store/actions/modalAction"
import { getDestributorList } from "../../apis/authApis"
import { saleBoxApi, transferBoxApi } from "../../apis/SalesApi"
import { getUserListApi } from "../../apis/userApis"
import TransferToDestributorOrReteller from "../../pages/dashboard/TransferToDestributorOrReteller"
import TransferToSold from "../../pages/dashboard/TransferToSold"
import TransferToStore from "../../pages/dashboard/TransferToStore"

const TransferController = (props) => {
    const type = props.type
    const data = props.data

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [dropDownLoading, setDropDownLoading] = useState(false)

    const [inputs, setInputs] = useState({
        current_location: '',
        err: '',
        allocated_user: '',
        invoice_number: '',
        invoice_value: '',
        sale_by: '',
        customer_address: '',
        customer_phone_no: '',
        customer_email: "",
        customer_name: ""
    })

    const { destributor, modal } = useSelector((state) => { return { destributor: state.destributor_list, modal: state.modal } })

    const [retellerList, setRetailerList] = useState([])
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

    const onTransferToStoreBtnClick = async () => {

        if (inputs.current_location == '') {
            handleValues('set', 'err', _lang('location_required'))
            return 0;
        }
        setLoading(true)
        const response = await transferBoxApi({ box_qr_code_id: data.box_qr_code_id, store_location: inputs.current_location })

        if (response.status == 1) {
            await modal.onAction()
            dispatch(closeModel())

        }
        setLoading(false)
    }

    const onTransferToDestributorBtnClick = async (isRetteler = false) => {

        if (!inputs.allocated_user || inputs.allocated_user == '') {
            handleValues('set', 'err', isRetteler ? _lang('reteller_required') : _lang('destributor_required'))
            return 0;
        }
        setLoading(true)
        const response = await transferBoxApi({ box_qr_code_id: data.box_qr_code_id, allocated_user: inputs.allocated_user._id })

        if (response.status == 1) {
            await modal.onAction()
            dispatch(closeModel())

        }
        setLoading(false)
    }


    const onSold = async () => {
        if (!(inputs.customer_name && inputs.customer_name != "")) {
            handleValues('set', 'err', _lang('customer_name_required'))
            return 0;
        }
        if (!(inputs.customer_email && inputs.customer_email != "")) {
            handleValues('set', 'err', _lang('customer_email_required'))
            return 0;
        } else if (!isEmail(inputs.customer_email)) {
            handleValues('set', 'err', _lang('unvalid_email'))
            return 0;
        }

        if (!(inputs.customer_phone_no && inputs.customer_phone_no != "")) {
            handleValues('set', 'err', _lang('customer_phone_no_required'))
            return 0;
        } else if (!isAllowedPhone(inputs.customer_phone_no)) {
            handleValues('set', 'err', _lang('phone_invalid'))
            return 0;
        }
        if (!(inputs.customer_address && inputs.customer_address != "")) {
            handleValues('set', 'err', _lang('customer_address_required'))
            return 0;
        }


        if (!(inputs.invoice_number && inputs.invoice_number != "")) {
            handleValues('set', 'err', _lang('invoice_number_required'))
            return 0;
        }
        if (!(inputs.invoice_value && inputs.invoice_value != "")) {
            handleValues('set', 'err', _lang('invoice_value_required'))
            return 0;
        }

        let saleBy = '';
        if(data.allocated_user && data.allocated_user._id!=''){
            saleBy = data.allocated_user._id
        }
        setLoading(true)
        
        const response = await saleBoxApi({
            box_qr_code_id: data.box_qr_code_id,
            customer_address: inputs.customer_address,
            customer_name: inputs.customer_name,
            saleBy,
            customer_email: inputs.customer_email,
            customer_phone_no: inputs.customer_phone_no,
            invoice_number: inputs.invoice_number,
            invoice_value: inputs.invoice_value,
        })

        if (response.status == 1) {
            await modal.onAction()
            dispatch(closeModel())

        }
        setLoading(false)
    }

    useEffect(() => {
        (async () => {

            if ((!destributor.data || destributor.data.length <= 0) && type == 'destributor') {
                setDropDownLoading(true)
                const response = await getDestributorList()
                if (response.status == 1) {
                    dispatch(setdestributorListAction(response.data.result))
                }
                setDropDownLoading(false)
            }

            if ( type == 'reteller') {
                setDropDownLoading(true)
                const response = await getUserListApi({ all: true, role: constants.user_role.DESTRIBUTOR_ROLE, usercode: data.allocated_user.usercode, verified: true })
                if (response.status == 1) {
                    setRetailerList(response.data.result)
                }
                setDropDownLoading(false)
            }
        })()
    }, [])

    return (
        <>
            {type == 'store' && <TransferToStore loading={loading} handleValues={handleValues} onSubmitBtnClick={onTransferToStoreBtnClick} />}

            {type == 'destributor' && <TransferToDestributorOrReteller loading={loading} list={destributor.data} handleValues={handleValues} onSubmitBtnClick={onTransferToDestributorBtnClick} />}

            {type == 'reteller' && <TransferToDestributorOrReteller fromReteller={true} loading={loading} list={retellerList} handleValues={handleValues} onSubmitBtnClick={async () => { await onTransferToDestributorBtnClick(true) }} />}

            {type == 'sold' && <TransferToSold loading={loading} handleValues={handleValues} onSubmitBtnClick={onSold} />}
        </>
    )
}
export default TransferController