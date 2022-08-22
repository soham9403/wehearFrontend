import { useEffect } from "react"
import { createContext } from "react"
import { useLayoutEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import constants from "../../../config/constants"
import { accessControllByRole, getDateFiltersTime, _lang } from "../../../config/helper"
import { removeCurrentUserAction, selectCurrentUserAction } from "../../../store/actions/currentUserActions"
import { setuserAnalyticAction } from "../../../store/actions/userAnalyticaction"
import { getUserInfo } from "../../apis/authApis"
import getUseranalayticInfo from "../../apis/dashboardApi"
import AnalysisCount from "../../pages/dashboard/AnalysisCount"

export const AnalysticFiltersContecxt = createContext(null)
export const AnalysticContext = createContext(null)
const AnalyticCountController = (props) => {
    const [analysticFilters, setAnalyticFilrter] = useState({ startDate: '', endDate: '', value: '' })
    const [analyticLoader, setAnalyticLoading] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const params_user_code = params.usercode
    const { userAnalytic, user } = useSelector(state => state)
    const handleAnlyticFilter = (field, value) => {
        if (field == 'value') {
            const date = getDateFiltersTime(value);
            setAnalyticFilrter({ ...analysticFilters, startDate: date.startDate, endDate: date.endDate, value })
        }
    }
    const allowedDatesFilter = [
        {
            label: _lang('today'),
            value: 'today'
        },
        {
            label: _lang('yesterday'),
            value: 'yesterday'
        },

        {
            label: _lang('last_7_days'),
            value: '7'
        },
        {
            label: _lang('last_30_days'),
            value: '30'
        },
        {
            label: _lang('last_90_days'),
            value: '90'
        },
        {
            label: _lang('last_365_days'),
            value: '365'
        },
        {
            label: _lang('Year_the_date'),
            value: 'this_year'
        },

    ]
    useLayoutEffect(() => {
        handleAnlyticFilter('value', 'today')
    }, [])
    const loadAnalyticsInfo = async () => {

        if (analysticFilters.value != '') {

            const res = await getUseranalayticInfo({
                user_code: params_user_code,
                ...analysticFilters
            })

            dispatch(setuserAnalyticAction(params_user_code, res.data))

        }


    }

    const fetchCurrentUserInfo = async () => {



        const res = await getUserInfo(params_user_code)
        if (res.status === 1) {
            if (Object.keys(res.data).length > 0)
                dispatch(selectCurrentUserAction(res.data))
            else
                alert('no user available with usercode ' + params_user_code)
        } else {
            alert(res.message)
        }





    }
    const fetchInfo = async () => {
        setAnalyticLoading(true)
        if (params_user_code != user.data.usercode) {
            await Promise.all([
                loadAnalyticsInfo(),
                fetchCurrentUserInfo()
            ])
        } else {
            await loadAnalyticsInfo()
            dispatch(removeCurrentUserAction())
        }
        setAnalyticLoading(false)
    }
    useEffect(() => {

        fetchInfo()
window.scrollTo({
    top:0,
    behavior:"smooth"
})
    }, [analysticFilters, params_user_code])
    const changePage = (path) => {
        if (path == 'users' && !accessControllByRole(user.data.role, "USERS_PAGE")) {
            return
        }
        navigate("/dashboard/" + params_user_code + '/' + path)
    }
    const checkPage = (path) => {
        // navigate("/dashboard/" + params_user_code + '/' + path)
        return location.pathname === "/dashboard/" + params_user_code + '/' + path
    }
    const analyticsObj = {
        refreshAnalyticCount: loadAnalyticsInfo
    }
    return (
        <>
            <div className='row bg-light'>
                <div className='row bg-gray'>
                    <AnalysisCount checkPage={checkPage} changePage={changePage} allowedDatesFilter={allowedDatesFilter} userInventoryData={userAnalytic.data[params_user_code] ? userAnalytic.data[params_user_code] : {}} analyticLoader={analyticLoader} handleAnlyticFilter={handleAnlyticFilter} analysticFilters={analysticFilters} />
                </div>
                <AnalysticFiltersContecxt.Provider value={analysticFilters}>
                    <AnalysticContext.Provider value={analyticsObj}>
                        {props.children}
                    </AnalysticContext.Provider>
                </AnalysticFiltersContecxt.Provider>
            </div>
        </>
    )
}
export default AnalyticCountController