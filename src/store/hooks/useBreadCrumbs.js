import { useSelector, useDispatch } from 'react-redux'
import { appendBreadCrumb, setBreadCrumb } from '../actions/breadCrumbAction'
const useBreadCrumb = () => {
    const breadCrumb = useSelector(state => state.breadcrumb)
    const dispatch = useDispatch()

    return {
        set: (data, append = false) => {
            if (!append) {
                dispatch(setBreadCrumb(data))
            } else {
                dispatch(appendBreadCrumb(data))
            }
        },
        get: () => breadCrumb.data
    }
}
export default useBreadCrumb