import { useEffect, useMemo } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getSalesListApi } from "../../../apis/SalesApi"
import Stock from "../../../pages/dashboard/salesboard/Stock"

const StockController = (props) => {
    const params = useParams()
    const params_user_code = params.usercode
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({})
    const sortByList = useMemo(() => ['box_qr_code_id_asc', 'box_qr_code_id_dsc', 'packing_date_asc', 'packing_date_dsc'])
    const [salesFilters, setFilters] = useState({
        page_no: 1,
        page_size: 10,
        search: '',
        category: '',
        box_qr_code_id: '',
        usercode: params_user_code,
        location: 'stock',
        sort_by: sortByList[0],
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
    const getList = async () => {
        setLoading(true)
        await getSalesListApi(salesFilters).then((res) => {
            setData(res.data)
        })
        setLoading(false)
    }
    useEffect(() => {
        (async () => {

            await getList()

        })()
    }, [salesFilters])
    return (
        <>
            <Stock
                onImportBtnClick={() => { props.onImportBtnClick(async () => { await getList() }) }}
                onMassTransffer={() => { props.onMassTransffer(async () => { await getList() }) }}
                loading={loading}
                handleFilters={handleFilters}
                filters={salesFilters}
                onTransfer={(type, data) => { props.onTransfer(type, data, async () => { await getList() }) }}
                sortByList={sortByList}
                data={data}
                exportCsv={() => { props.exportCsv(salesFilters) }}
            />
        </>
    )
}
export default StockController