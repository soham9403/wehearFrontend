import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { _lang } from "../../../config/helper"
import { setdestributorListAction } from "../../../store/actions/destributorListAction"
import { getDestributorList } from "../../apis/authApis"
import { getRangedDataApi, transferBoxApi, transferBoxBulkApi } from "../../apis/SalesApi"
import { getUserListApi } from "../../apis/userApis"
import MassTransfer from "../../pages/masstransfer/MassTransfer"

const MassTransferController = () => {

    const { user, destributor_list } = useSelector(state => state)
    const dispatch = useDispatch()
    const destributor = destributor_list
    const [type, setType] = useState(user.data.role == constants.user_role.DESTRIBUTOR_ROLE ? 'retteler' : '')// '','retteler','destributor'
    const [inputs, setInputs] = useState({
        current_location: '',
        err: '',
        successMsg: '',
        rangeFrom: '',
        rangeTo: '',
        allocated_destributor: user.data.role == constants.user_role.DESTRIBUTOR_ROLE ? { usercode: user.data.usercode } : '',
        allocated_user: ''
    })

    const [transferAvailableList, setTransferAvailableList] = useState({ list: [], total: 0, totalChecked: 0 })


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


        if (field == 'allocated_destributor') {
            (async () => {
                setDropDownLoading(true)
                const response = await getUserListApi({ all: true, role: constants.user_role.DESTRIBUTOR_ROLE, usercode: value.usercode, verified: true })
                if (response.status == 1) {
                    setRetailerList(response.data.result)
                }

                setDropDownLoading(false)
            })()

        }
        if (field != 'err') {
            temp['err'] = ''
        }
        setInputs(temp)
    }
    useLayoutEffect(()=>{
        handleValues('set','allocated_destributor',{ usercode: user.data.usercode })
    },[])
    const getRangedData = async () => {
        if (inputs.rangeFrom == '') {
            handleValues('set', 'err', _lang('start_required'))
            return 0
        }
        if (inputs.rangeTo == '') {
            handleValues('set', 'err', _lang('end_required'))
            return 0
        }
        const response = await getRangedDataApi({
            start: inputs.rangeFrom,
            end: inputs.rangeTo,
            to_location: type == 'destributor' ? "to_destributor" : "to_reteller"
        })

        if (response.status == 1) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                data[i]['checked'] = true;
            }
            setTransferAvailableList({ list: data, total: data.length, totalChecked: data.length })
        }
    }

    const checkUncheck = (index, value) => {
        const temp = { ...transferAvailableList }
        temp['list'][index]['checked'] = value;
        if (value == true) {
            temp['totalChecked'] = temp['totalChecked'] + 1;
        } else {
            temp['totalChecked'] = temp['totalChecked'] - 1;
        }


        setTransferAvailableList(temp)
    }

    const [loading, setLoading] = useState(false)
    const [dropDownLoading, setDropDownLoading] = useState(false)
    const [retellerList, setRetailerList] = useState([])


    const transferMass = async () => {

        const qrCodes = [];
        if (!inputs.allocated_user || inputs.allocated_user == '') {

            handleValues('set', 'err', type == 'retteler' ? _lang('reteller_required') : _lang('destributor_required'))
            return 0
        }
        for (let row of transferAvailableList.list) {
            if (row.checked) {
                qrCodes.push(row.box_qr_code_id)
            }
        }
        setLoading(true)
        const response = await transferBoxBulkApi({ box_qr_code_id: JSON.stringify(qrCodes), allocated_user: inputs.allocated_user._id })
        if (response.status == 1) {
            setTransferAvailableList({ list: [], total: 0, totalChecked: 0 })
            handleValues('set', 'successMsg', _lang('boxes_transfered_successfully'))
            setTimeout(() => {
                handleValues('set', 'successMsg', '')
            }, 3000);
            setType('')
        }
        setLoading(false)
    }

    useEffect(() => {

        (async () => {
            if ((!destributor.data || destributor.data.length <= 0) && type != 'retteler') {
                setDropDownLoading(true)
                const response = await getDestributorList()
                if (response.status == 1) {
                    dispatch(setdestributorListAction(response.data.result))
                }
                setDropDownLoading(false)
            }

            if (type == 'retteler') {
                setDropDownLoading(true)
                const response = await getUserListApi({ all: true, role: constants.user_role.DESTRIBUTOR_ROLE, usercode: inputs.allocated_destributor.usercode, verified: true })
                if (response.status == 1) {
                    setRetailerList(response.data.result)
                }
                setDropDownLoading(false)
            }
        })()
    }, [])
    if (loading) {
        return (
            <SmallLoader />
        )
    } else {
        return (
            <>
                
                    
                        <MassTransfer
                            transferMass={transferMass}
                            getRangedData={getRangedData}
                            type={type}
                            checkUncheck={checkUncheck}
                            handleValues={handleValues}
                            loading={loading}
                            setType={setType}
                            transferAvailableList={transferAvailableList}
                            dropDownLoading={dropDownLoading}
                            list={retellerList}
                            destributorList={destributor}
                            userData={user.data}
                        />
                   
            </>
        )
    }

}
export default MassTransferController