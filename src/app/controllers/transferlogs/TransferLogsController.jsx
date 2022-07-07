import { useContext, useEffect } from "react"
import { _lang } from "../../../config/helper"
import useBreadCrumb from "../../../store/hooks/useBreadCrumbs"

import UserDataPage from "../../pages/user/UserDataPage"

import { useState } from "react"
import { getTransferlogsApi, resetTransferlogsApi } from "../../apis/transferlogsApi"
import TransferLogs from "../../pages/transferlogs/TransferLogs"
import { useDispatch } from "react-redux"
import { openModal } from "../../../store/actions/modalAction"
const TransferLogsController = () => {
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [filters, setFilters] = useState({

        page_no: 1,
        page_size: 10,

    })
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

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)





    const getTransferLogs = async () => {

        setLoading(true)
        const response = await getTransferlogsApi(filters)

        if (response.status == 1) {
            setCount(response.data.total)
            setList(response.data.result)
        }

        setLoading(false)
    }
    const bulkTransfer = async (update_id) => {

        setLoading(true)
        const response = await resetTransferlogsApi({ update_id })

        if (response.status == 1) {
            await getTransferLogs()
        }

        setLoading(false)
    }

    const onRevertButtonClick = (row) => {
        dispatch(openModal(
            "DELETE",
            async () => {
                await bulkTransfer(row._id)
            },
            <></>
            , {
                title: _lang('ask_revert'),
                btnTitle: _lang('revert')
            }
        ))
    }
    useEffect(() => {
        (async () => {
            await getTransferLogs()

        })()
    }, [filters])

    return (
        // <UserDataPage

        //     loading={loading}            
        //     list={list}
        // />
        <>
            <TransferLogs
                filters={filters}
                count={count}
                onRevertButtonClick={onRevertButtonClick}

                handleFilters={handleFilters} data={list} loading={loading} />
        </>
    )
}
export default TransferLogsController