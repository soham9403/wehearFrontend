import { useState } from "react"
import { exportSalesApi } from "../../apis/SalesApi"
import ExportCsv from "../../pages/dashboard/ExportCsv"
import FileDownload from 'js-file-download'
import { addZeroPrefix } from "../../../config/helper"
const ExportController = (props) => {
    const [loading, setLoading] = useState(false)
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + addZeroPrefix(date.getMonth() + 1) + '-' + addZeroPrefix(date.getDate());
    const [filters, setFilters] = useState({ startDate: currentDate, endDate: currentDate, date_type: 'packing_date' })
    const [err, setError] = useState('')
    const handleValues = (method, field, value) => {
        const temp = { ...filters }

        if (method == 'get') {
            return filters[field]
        }
        setError('')
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
        setFilters(temp)
    }
    const exportCsv = async () => {
        setLoading(true)
        const temp = { ...filters }
        temp['startDate'] = new Date(temp['startDate']).getTime()
        temp['endDate'] = new Date(temp['endDate']).getTime() + (1000 * 60 * 60 * 24)

        const res = await exportSalesApi({ ...props.salesFilters, ...temp })
        if (res) {
            FileDownload(res, 'data.csv')
        } else {
            setError('No Data available')
        }

        setLoading(false)
    }
    return (
        <>
            <ExportCsv err={err} handleValues={handleValues} exportCsv={exportCsv} loading={loading} />
        </>
    )
}
export default ExportController