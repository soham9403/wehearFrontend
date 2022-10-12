import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getLeadCountsApi } from "../../apis/lead.api"
import LeadsCount from "../../pages/lead/LeadsCount"

const LeadsCountController = () => {
    const [types, setTypes] = useState([])
    const [status, setStatus] = useState([])
    const [typesLoading, setTypesLoading] = useState([])
    const [statusLoading, setStatusLoading] = useState([])
    const { user } = useSelector(state => state)
    const params = useParams()
    // const [state, setState] = useState({
    //     type: params.type,

    // })

    const getTypesCount = async () => {
        setTypesLoading(true)
        const response = await getLeadCountsApi({ usercode: user.data.usercode, by: 'type' })
        
        if (response.status == 1) {
            
            setTypes(response.data)
        }
        setTypesLoading(false)
    }
    const getStatusCount = async () => {
        setStatusLoading(true)
        const response = await getLeadCountsApi({ usercode: user.data.usercode, by: 'status', type: params.type })
        
        if (response.status == 1) {
            setStatus(response.data)
        }
        setStatusLoading(false)
    }




    useEffect(() => {
        getTypesCount()
    }, [])
    useEffect(() => {
        getStatusCount()
    }, [params.type])

 
    return <LeadsCount
        types={types}
        typesLoading={typesLoading}
        statusLoading={statusLoading}
        status={status}

    />
}
export default LeadsCountController