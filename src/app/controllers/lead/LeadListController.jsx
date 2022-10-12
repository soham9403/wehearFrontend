import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { openModal } from "../../../store/actions/modalAction"
import { getLeadDataApi, updateLeadApi } from "../../apis/lead.api"
import LeadList from "../../pages/lead/LeadList"
import ForwardLeadController from "./ForwardLeadController"
import LeadCreateController from "./LeadCreateController"


const LeadListController = () => {
    const dispatch = useDispatch()

    const onAddButtonClick = () => {
        dispatch(openModal(
            "CUSTOM",
            async () => { },
            <LeadCreateController />
        ))
    }


    const params = useParams()
    const params_user_code = params.usercode
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({})

    const [filters, setFilters] = useState({
        pageNo: 1,
        pageSize: 10,
        search: '',
        usercode: params_user_code,
        type: params.type,
        status: params.status,
        from: false
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
    const getList = async () => {
        setLoading(true)
        await getLeadDataApi(filters).then((res) => {
            setData(res.data)
        })
        setLoading(false)
    }
    useEffect(() => {
        getList()
    }, [filters])

    const onStatusChange = useCallback(async (value, id) => {
        await updateLeadApi({ value, id, field: "status" })
    }, [])
    const onForward = useCallback(async (id) => {
        dispatch(openModal(
            "CUSTOM",
            async () => { await getList() },
            <ForwardLeadController id={id} />
        ))
    }, [])

    useEffect(() => {
        if (params.type != filters.type || params.status != filters.status) {
            setFilters({ ...filters, type: params.type, status: params.status })
        }
    }, [params])

    return (
        <LeadList

            onAddButtonClick={onAddButtonClick}
            loading={loading}
            handleFilters={handleFilters}
            filters={filters}
            data={data}
            onStatusChange={onStatusChange}
            onForward={onForward}

        />
    )
}
export default LeadListController