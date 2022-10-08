import { useContext, useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getSalesListApi } from "../../../apis/SalesApi"
import Sold from "../../../pages/dashboard/salesboard/Sold"
import { AnalysticFiltersContecxt } from "../AnalyticCountController"

const SoldController = (props) => {
    const params = useParams()
    const params_user_code = params.usercode
    const [loading, setLoading] = useState(false)
    const analyticFiters = useContext(AnalysticFiltersContecxt)
    const [data, setData] = useState({})
    const [salesFilters, setFilters] = useState({
        pageNo: 1,
        pageSize: 10,
        search: '',
        box_qr_code_id: '',
        isB2C: false,
        usercode: params_user_code,
        location: 'sold',
        inventoryType: '',//product //marketing_material        

    })
    const handleFilters = (field, value) => {
        const temp = { ...salesFilters }
        if (typeof (field) == 'object') {
            for (let i = 0; i < field.length; i++) {
                temp[field[i]] = value[i]
            }
        } else {

            temp[field] = value

        }
        setFilters(temp)
    }
    const getList = async (filters) => {
        setLoading(true)
        await getSalesListApi(filters).then((res) => {
            setData(res.data)
        })
        setLoading(false)
    }
    useEffect(() => {
        (async () => {
            if (analyticFiters.value != '') {
                await getList({ ...salesFilters, ...analyticFiters })
            }
        })()

    }, [salesFilters, analyticFiters])


    return (
        <>
            <Sold

                onMassTransffer={() => { props.onMassTransffer(async () => { await getList() }) }}

                loading={loading}
                handleFilters={handleFilters}
                filters={salesFilters}
                onTransfer={(type, data) => { props.onTransfer(type, data, async () => { await getList() }) }}

                data={data}
                exportCsv={() => { props.exportCsv(salesFilters) }}
            />
        </>
    )
}
export default SoldController