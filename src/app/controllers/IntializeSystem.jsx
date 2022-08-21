import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../component/common/Loader"
import { createCategoryListAction } from "../../store/actions/categoryAction"
import { getcategoryListApi } from "../apis/categoryApis"

const IntializeSystem = ({ children }) => {


    const [loading, setLoading] = useState(true)
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()
    const fechCategories = async () => {
        const response = await getcategoryListApi()

        if (response.status === 1) {
            dispatch(createCategoryListAction(response.data))
        } else {
            alert(response.message)
        }
    }

    const initialize = async () => {

        if (user.isLoggedIn) {

            setLoading(true)
            await Promise.all([
                fechCategories()
            ])
            setLoading(false)

        }else{
            setLoading(false)
        }
    }
    useEffect(() => {
        initialize()
    }, [user.isLoggedIn])
    if (loading) {
        return <Loader />
    }
    return <>{children}</>

}
export default IntializeSystem